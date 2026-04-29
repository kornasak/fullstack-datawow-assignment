import { ReservationModule } from './modules/reservations/reservation.module';
import { ConcertModule } from './modules/concerts/concert.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    AuthModule,
    ConcertModule,
    ReservationModule,
  ],
})
export class AppModule {}
