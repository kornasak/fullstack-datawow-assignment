import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import {
  CreateConcertDto,
  CreateConcertResponse,
} from './dto/create-concert.dto';
import { GetConcertDto, GetConcertResponse } from './dto/get-concert.dto';
import {
  GetConcertForAdminDto,
  GetConcertForAdminResponse,
} from './dto/get-concert-for-admin.dto';
import { GetConcertAdminSummaryResponse } from './dto/get-concert-summary.dto';
import { DeleteConcertResponse } from './dto/delete-concert.dto';

@Injectable()
export class ConcertService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateConcertDto): Promise<CreateConcertResponse> {
    return await this.prisma.concert.create({
      data: {
        name: dto.name,
        description: dto.description,
        totalSeats: dto.totalSeats,
      },
    });
  }

  async findAll(
    query: GetConcertDto,
    userId: number,
  ): Promise<GetConcertResponse> {
    const page = query.page ?? 1;
    const limit = query.limit ?? 10;
    const skip = (page - 1) * limit;

    const [items, total] = await this.prisma.$transaction([
      this.prisma.concert.findMany({
        skip,
        take: limit,
        select: {
          id: true,
          name: true,
          description: true,
          totalSeats: true,
          reservations: {
            where: {
              status: 'RESERVED',
            },
            select: {
              id: true,
              userId: true,
            },
          },
        },
      }),
      this.prisma.concert.count(),
    ]);

    return {
      items: items.map((concert) => {
        const reservedSeats = concert.reservations.length;
        const isReservedByMe = concert.reservations.some(
          (reservation) => reservation.userId === userId,
        );

        return {
          id: concert.id,
          name: concert.name,
          description: concert.description,
          totalSeats: concert.totalSeats,
          reservedSeats,
          availableSeats: concert.totalSeats - reservedSeats,
          isFull: reservedSeats >= concert.totalSeats,
          isReservedByMe,
        };
      }),
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit) || 1,
      },
    };
  }

  async findAllForAdmin(
    query: GetConcertForAdminDto,
  ): Promise<GetConcertForAdminResponse> {
    const page = query.page ?? 1;
    const limit = query.limit ?? 10;
    const skip = (page - 1) * limit;

    const [items, total] = await this.prisma.$transaction([
      this.prisma.concert.findMany({
        skip,
        take: limit,
        orderBy: {
          createdAt: 'desc',
        },
        select: {
          id: true,
          name: true,
          description: true,
          totalSeats: true,
          createdAt: true,
          updatedAt: true,
          _count: {
            select: {
              reservations: {
                where: {
                  status: 'RESERVED',
                },
              },
            },
          },
        },
      }),
      this.prisma.concert.count(),
    ]);

    return {
      items: items.map((concert) => ({
        id: concert.id,
        name: concert.name,
        description: concert.description,
        totalSeats: concert.totalSeats,
        reservedSeats: concert._count.reservations,
        availableSeats: concert.totalSeats - concert._count.reservations,
        createdAt: concert.createdAt,
        updatedAt: concert.updatedAt,
      })),
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit) || 1,
      },
    };
  }

  async getAdminSummary(): Promise<GetConcertAdminSummaryResponse> {
    const [totalSeatsResult, reservedCount, cancelledCount] =
      await this.prisma.$transaction([
        this.prisma.concert.aggregate({
          _sum: {
            totalSeats: true,
          },
        }),
        this.prisma.reservation.count({
          where: {
            status: 'RESERVED',
          },
        }),
        this.prisma.reservation.count({
          where: {
            status: 'CANCELLED',
          },
        }),
      ]);

    return {
      totalSeats: totalSeatsResult._sum.totalSeats ?? 0,
      reserved: reservedCount,
      cancelled: cancelledCount,
    };
  }

  async remove(id: number): Promise<DeleteConcertResponse> {
    const concert = await this.prisma.concert.findUnique({
      where: { id },
    });

    if (!concert) {
      throw new NotFoundException('Concert not found');
    }

    await this.prisma.concert.delete({
      where: { id },
    });

    return { message: 'Delete success' };
  }
}
