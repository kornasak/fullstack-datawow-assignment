import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, Min } from 'class-validator';
import { PaginationMetaDto } from '../../../common/dto/paginated-response.dto';

export class GetConcertForAdminDto {
  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit?: number;
}

export class GetConcertForAdminItem {
  @ApiProperty()
  id!: number;

  @ApiProperty()
  name!: string;

  @ApiProperty()
  description!: string;

  @ApiProperty()
  totalSeats!: number;

  @ApiProperty()
  reservedSeats!: number;

  @ApiProperty()
  availableSeats!: number;

  @ApiProperty()
  createdAt!: Date;

  @ApiProperty()
  updatedAt!: Date;
}

export class GetConcertForAdminResponse {
  @ApiProperty({ type: [GetConcertForAdminItem] })
  items!: GetConcertForAdminItem[];

  @ApiProperty({ example: 100 })
  meta!: PaginationMetaDto;
}
