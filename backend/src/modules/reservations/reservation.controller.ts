import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';

import { Roles } from '../auth/decorators/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { ReservationService } from './reservation.service';
import type { RequestWithUser } from '../../common/types/request';

@Controller('reservations')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth('access-token')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Get('admin/history')
  @Roles('ADMIN')
  findAllHistory() {
    return this.reservationService.findAllHistory();
  }

  @Get('me')
  @Roles('USER')
  findMyHistory(@Req() req: RequestWithUser) {
    return this.reservationService.findMyHistory(req.user.id);
  }
}
