import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';
import {
  GetAllHistoryDto,
  GetAllHistoryResponse,
} from 'src/modules/reservations/dto/get-all-history.dto';

@Injectable()
export class ReservationService {
  constructor(private readonly prisma: PrismaService) {}

  async findAllHistory(
    query: GetAllHistoryDto,
  ): Promise<GetAllHistoryResponse> {
    const page = query.page ?? 1;
    const limit = query.limit ?? 10;
    const skip = (page - 1) * limit;

    const [items, total] = await this.prisma.$transaction([
      this.prisma.reservation.findMany({
        skip,
        take: limit,
        select: {
          id: true,
          status: true,
          createdAt: true,
          updatedAt: true,
          user: {
            select: {
              id: true,
              fullName: true,
              email: true,
              role: true,
            },
          },
          concert: {
            select: {
              id: true,
              name: true,
              description: true,
              totalSeats: true,
            },
          },
        },
      }),
      this.prisma.reservation.count(),
    ]);

    return {
      items: items.map((reservation) => ({
        id: reservation.id,
        status: reservation.status,
        action: reservation.status === 'CANCELLED' ? 'Cancel' : 'Reserve',
        createdAt: reservation.createdAt,
        updatedAt: reservation.updatedAt,
        user: reservation.user,
        concert: reservation.concert,
      })),
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit) || 1,
      },
    };
  }

  findMyHistory(userId: number) {
    return this.prisma.reservation.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
      select: {
        id: true,
        status: true,
        createdAt: true,
        concert: {
          select: {
            id: true,
            name: true,
            totalSeats: true,
          },
        },
      },
    });
  }

  async reserve(userId: number, concertId: number) {
    const concert = await this.prisma.concert.findUnique({
      where: { id: concertId },
    });

    if (!concert) {
      throw new NotFoundException('Concert not found');
    }

    const existing = await this.prisma.reservation.findUnique({
      where: {
        userId_concertId: {
          userId,
          concertId,
        },
      },
    });

    if (existing && existing.status === 'RESERVED') {
      throw new BadRequestException('Already reserved');
    }

    const reservedCount = await this.prisma.reservation.count({
      where: {
        concertId,
        status: 'RESERVED',
      },
    });

    if (reservedCount >= concert.totalSeats) {
      throw new BadRequestException('Concert full');
    }

    if (existing) {
      return this.prisma.reservation.update({
        where: {
          userId_concertId: {
            userId,
            concertId,
          },
        },
        data: {
          status: 'RESERVED',
        },
      });
    }

    return this.prisma.reservation.create({
      data: {
        userId,
        concertId,
      },
    });
  }

  async cancel(userId: number, concertId: number) {
    const reservation = await this.prisma.reservation.findUnique({
      where: {
        userId_concertId: {
          userId,
          concertId,
        },
      },
    });

    if (!reservation) {
      throw new NotFoundException('Reservation not found');
    }

    if (reservation.status === 'CANCELLED') {
      throw new BadRequestException('Reservation already cancelled');
    }

    return this.prisma.reservation.update({
      where: {
        userId_concertId: {
          userId,
          concertId,
        },
      },
      data: {
        status: 'CANCELLED',
      },
    });
  }
}
