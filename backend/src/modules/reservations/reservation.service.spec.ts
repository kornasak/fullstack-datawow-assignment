import {
  ConflictException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { PrismaService } from '../../prisma/prisma.service';
import { ReservationService } from './reservation.service';

describe('ReservationService', () => {
  let service: ReservationService;

  const prismaMock = {
    concert: {
      findUnique: jest.fn(),
    },
    reservation: {
      findUnique: jest.fn(),
      count: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
    },
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReservationService,
        {
          provide: PrismaService,
          useValue: prismaMock,
        },
      ],
    }).compile();

    service = module.get<ReservationService>(ReservationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('reserve', () => {
    it('should reserve successfully', async () => {
      prismaMock.concert.findUnique.mockResolvedValue({
        id: 1,
        totalSeats: 10,
      });

      prismaMock.reservation.findUnique.mockResolvedValue(null);
      prismaMock.reservation.count.mockResolvedValue(5);

      prismaMock.reservation.create.mockResolvedValue({
        id: 1,
        userId: 1,
        concertId: 1,
      });

      const result = await service.reserve(1, 1);

      expect(result.id).toBe(1);
    });

    it('should throw NotFoundException if concert not found', async () => {
      prismaMock.concert.findUnique.mockResolvedValue(null);

      await expect(service.reserve(1, 1)).rejects.toThrow(NotFoundException);
    });

    it('should throw ConflictException if already reserved', async () => {
      prismaMock.concert.findUnique.mockResolvedValue({
        id: 1,
        totalSeats: 10,
      });

      prismaMock.reservation.findUnique.mockResolvedValue({
        id: 99,
        userId: 1,
        concertId: 1,
        status: 'RESERVED',
      });

      await expect(service.reserve(1, 1)).rejects.toThrow(ConflictException);

      expect(prismaMock.reservation.create).not.toHaveBeenCalled();
    });

    it('should throw BadRequestException if full', async () => {
      prismaMock.concert.findUnique.mockResolvedValue({
        id: 1,
        totalSeats: 10,
      });

      prismaMock.reservation.findUnique.mockResolvedValue(null);
      prismaMock.reservation.count.mockResolvedValue(10);

      await expect(service.reserve(1, 1)).rejects.toThrow(BadRequestException);
    });

    it('should re-reserve by updating cancelled reservation', async () => {
      prismaMock.concert.findUnique.mockResolvedValue({
        id: 1,
        totalSeats: 10,
      });

      prismaMock.reservation.findUnique.mockResolvedValue({
        id: 99,
        userId: 1,
        concertId: 1,
        status: 'CANCELLED',
      });

      prismaMock.reservation.count.mockResolvedValue(5);

      prismaMock.reservation.update.mockResolvedValue({
        id: 99,
        userId: 1,
        concertId: 1,
        status: 'RESERVED',
      });

      const result = await service.reserve(1, 1);

      expect(result.status).toBe('RESERVED');

      expect(prismaMock.reservation.update).toHaveBeenCalledWith({
        where: {
          userId_concertId: {
            userId: 1,
            concertId: 1,
          },
        },
        data: {
          status: 'RESERVED',
        },
      });

      expect(prismaMock.reservation.create).not.toHaveBeenCalled();
    });
  });

  describe('cancel', () => {
    it('should cancel successfully', async () => {
      prismaMock.reservation.findUnique.mockResolvedValue({
        id: 1,
        userId: 1,
        concertId: 1,
        status: 'RESERVED',
      });

      prismaMock.reservation.update.mockResolvedValue({
        id: 1,
        status: 'CANCELLED',
      });

      const result = await service.cancel(1, 1);

      expect(result.status).toBe('CANCELLED');
    });

    it('should throw NotFoundException if reservation not found', async () => {
      prismaMock.reservation.findUnique.mockResolvedValue(null);

      await expect(service.cancel(1, 1)).rejects.toThrow(NotFoundException);
    });

    it('should throw BadRequestException if reservation already cancelled', async () => {
      prismaMock.reservation.findUnique.mockResolvedValue({
        id: 1,
        userId: 1,
        concertId: 1,
        status: 'CANCELLED',
      });

      await expect(service.cancel(1, 1)).rejects.toThrow(BadRequestException);

      expect(prismaMock.reservation.update).not.toHaveBeenCalled();
    });
  });
});
