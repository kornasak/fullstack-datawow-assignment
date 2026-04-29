import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, Min } from 'class-validator';
import { PaginationMetaDto } from '../../../common/dto/paginated-response.dto';

export class GetConcertDto {
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

export class GetConcertItem {
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
  isFull!: boolean;

  @ApiProperty()
  isReservedByMe!: boolean;
}

export class GetConcertResponse {
  @ApiProperty({ type: [GetConcertItem] })
  items!: GetConcertItem[];

  @ApiProperty({ example: 100 })
  meta!: PaginationMetaDto;
}
