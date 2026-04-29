import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateConcertDto } from './dto/create-concert.dto';

@Injectable()
export class ConcertService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateConcertDto) {
    return this.prisma.concert.create({
      data: dto,
    });
  }

  findAll() {
    return this.prisma.concert.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async remove(id: number) {
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
