import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class ReservationService {
  constructor(private readonly prisma: PrismaService) {}

  findAllHistory() {
    return this.prisma.reservation.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      include: {
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
    });
  }

  findMyHistory(userId: number) {
    return this.prisma.reservation.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        concert: {
          select: {
            id: true,
            name: true,
            description: true,
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
