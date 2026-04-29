import { Controller, Get, Query, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse } from '@nestjs/swagger';

import { Roles } from '../auth/decorators/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { ReservationService } from './reservation.service';
import type { RequestWithUser } from '../../common/types/request';
import {
  GetAllHistoryDto,
  GetAllHistoryResponse,
} from './dto/get-all-history.dto';

@Controller('reservations')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth('access-token')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Get('admin/history')
  @Roles('ADMIN')
  @ApiBearerAuth('access-token')
  @ApiOkResponse({ type: GetAllHistoryResponse })
  findAllHistory(
    @Query() query: GetAllHistoryDto,
  ): Promise<GetAllHistoryResponse> {
    return this.reservationService.findAllHistory(query);
  }

  @Get('me')
  @Roles('USER')
  @ApiBearerAuth('access-token')
  findMyHistory(@Req() req: RequestWithUser) {
    return this.reservationService.findMyHistory(req.user.id);
  }
}
