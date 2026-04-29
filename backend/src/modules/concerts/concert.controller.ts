import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ConcertService } from './concert.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import {
  CreateConcertDto,
  CreateConcertResponse,
} from './dto/create-concert.dto';
import { ReservationService } from '../reservations/reservation.service';
import type { RequestWithUser } from '../../common/types/request';
import { GetConcertDto, GetConcertResponse } from './dto/get-concert.dto';
import {
  GetConcertForAdminDto,
  GetConcertForAdminResponse,
} from './dto/get-concert-for-admin.dto';
import { GetConcertAdminSummaryResponse } from './dto/get-concert-summary.dto';
import { DeleteConcertResponse } from './dto/delete-concert.dto';

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
  @ApiOkResponse({ type: GetConcertResponse })
  findAll(
    @Query() query: GetConcertDto,
    @Req() req: RequestWithUser,
  ): Promise<GetConcertResponse> {
    return this.concertService.findAll(query, req.user.id);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @ApiBearerAuth('access-token')
  @ApiCreatedResponse({ type: CreateConcertResponse })
  async create(@Body() dto: CreateConcertDto): Promise<CreateConcertResponse> {
    return await this.concertService.create(dto);
  }

  @Get('admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @ApiBearerAuth('access-token')
  @ApiOkResponse({ type: GetConcertForAdminResponse })
  findAllForAdmin(
    @Query() query: GetConcertForAdminDto,
  ): Promise<GetConcertForAdminResponse> {
    return this.concertService.findAllForAdmin(query);
  }

  @Get('admin/summary')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @ApiBearerAuth('access-token')
  @ApiOkResponse({ type: GetConcertAdminSummaryResponse })
  getAdminSummary(): Promise<GetConcertAdminSummaryResponse> {
    return this.concertService.getAdminSummary();
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @ApiBearerAuth('access-token')
  @ApiNoContentResponse({ type: DeleteConcertResponse })
  remove(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<DeleteConcertResponse> {
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
