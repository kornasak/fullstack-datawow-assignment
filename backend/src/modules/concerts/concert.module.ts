import { ReservationService } from '../reservations/reservation.service';
import { PrismaModule } from '../../prisma/prisma.module';
import { ConcertController } from './concert.controller';
import { ConcertService } from './concert.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [PrismaModule],
  controllers: [ConcertController],
  providers: [ConcertService, ReservationService],
})
export class ConcertModule {}
