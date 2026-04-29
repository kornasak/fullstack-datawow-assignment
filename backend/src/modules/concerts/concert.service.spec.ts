import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { PrismaService } from '../../prisma/prisma.service';
import { ConcertService } from './concert.service';

describe('ConcertService', () => {
  let service: ConcertService;

  const prismaMock = {
    concert: {
      create: jest.fn(),
      findMany: jest.fn(),
      count: jest.fn(),
      findUnique: jest.fn(),
      delete: jest.fn(),
    },
    reservation: {
      findMany: jest.fn(),
    },
    $transaction: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    prismaMock.$transaction.mockImplementation(
      async <T extends unknown[]>(
        queries: Promise<T[number]>[],
      ): Promise<T> => {
        return Promise.all(queries) as Promise<T>;
      },
    );

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ConcertService,
        {
          provide: PrismaService,
          useValue: prismaMock,
        },
      ],
    }).compile();

    service = module.get<ConcertService>(ConcertService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a concert successfully', async () => {
      const dto = {
        name: 'Rock Bangkok 2026',
        description: 'Free concert event',
        totalSeats: 100,
      };

      prismaMock.concert.create.mockResolvedValue({
        id: 1,
        ...dto,
      });

      const result = await service.create(dto);

      expect(result).toEqual({
        id: 1,
        ...dto,
      });

      expect(prismaMock.concert.create).toHaveBeenCalledWith({
        data: dto,
      });
    });
  });

  describe('findAll', () => {
    it('should return concert list with reservation status', async () => {
      prismaMock.concert.findMany.mockResolvedValue([
        {
          id: 1,
          name: 'Concert A',
          description: 'Description A',
          totalSeats: 2,
          reservations: [{ id: 1, userId: 99 }],
        },
        {
          id: 2,
          name: 'Concert B',
          description: 'Description B',
          totalSeats: 1,
          reservations: [{ id: 2, userId: 10 }],
        },
      ]);

      prismaMock.concert.count.mockResolvedValue(2);

      const result = await service.findAll({ page: 1, limit: 10 }, 99);

      expect(result).toEqual({
        items: [
          {
            id: 1,
            name: 'Concert A',
            description: 'Description A',
            totalSeats: 2,
            reservedSeats: 1,
            availableSeats: 1,
            isFull: false,
            isReservedByMe: true,
          },
          {
            id: 2,
            name: 'Concert B',
            description: 'Description B',
            totalSeats: 1,
            reservedSeats: 1,
            availableSeats: 0,
            isFull: true,
            isReservedByMe: false,
          },
        ],
        meta: {
          total: 2,
          page: 1,
          limit: 10,
          totalPages: 1,
        },
      });
    });

    it('should return empty list', async () => {
      prismaMock.concert.findMany.mockResolvedValue([]);
      prismaMock.concert.count.mockResolvedValue(0);

      const result = await service.findAll({ page: 1, limit: 10 }, 99);

      expect(result).toEqual({
        items: [],
        meta: {
          total: 0,
          page: 1,
          limit: 10,
          totalPages: 1,
        },
      });
    });
  });

  describe('remove', () => {
    it('should delete a concert successfully', async () => {
      prismaMock.concert.findUnique.mockResolvedValue({
        id: 1,
        name: 'Concert A',
        description: 'Description A',
        totalSeats: 100,
      });

      prismaMock.concert.delete.mockResolvedValue({
        id: 1,
        name: 'Concert A',
        description: 'Description A',
        totalSeats: 100,
      });

      const result = await service.remove(1);

      expect(result).toEqual({
        message: 'Delete success',
      });

      expect(prismaMock.concert.delete).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });

    it('should throw NotFoundException if concert to delete not found', async () => {
      prismaMock.concert.findUnique.mockResolvedValue(null);

      await expect(service.remove(999)).rejects.toThrow(NotFoundException);

      expect(prismaMock.concert.delete).not.toHaveBeenCalled();
    });
  });
});
