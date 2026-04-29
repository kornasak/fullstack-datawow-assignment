import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ConcertService } from './concert.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { ApiBearerAuth } from '@nestjs/swagger';
import { CreateConcertDto } from './dto/create-concert.dto';
import { ReservationService } from '../reservations/reservation.service';
import type { RequestWithUser } from '../../common/types/request';

@Controller('concerts')
export class ConcertController {
  constructor(
    private readonly concertService: ConcertService,
    private readonly reservationService: ReservationService,
  ) {}

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('USER')
  @ApiBearerAuth('access-token')
  findAll() {
    return this.concertService.findAll();
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @ApiBearerAuth('access-token')
  create(@Body() dto: CreateConcertDto) {
    return this.concertService.create(dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @ApiBearerAuth('access-token')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.concertService.remove(id);
  }

  @Post(':id/reserve')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('USER')
  @ApiBearerAuth('access-token')
  reserve(@Req() req: RequestWithUser, @Param('id', ParseIntPipe) id: number) {
    return this.reservationService.reserve(req.user.id, id);
  }

  @Delete(':id/reserve')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('USER')
  @ApiBearerAuth('access-token')
  cancel(@Req() req: RequestWithUser, @Param('id', ParseIntPipe) id: number) {
    return this.reservationService.cancel(req.user.id, id);
  }
}
