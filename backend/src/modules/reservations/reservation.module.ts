import { ReservationController } from './reservation.controller';
import { ReservationService } from './reservation.service';
import { Module } from '@nestjs/common';

@Module({
  controllers: [ReservationController],
  providers: [ReservationService],
})
export class ReservationModule {}
