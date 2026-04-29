import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, Min } from 'class-validator';
import { PaginationMetaDto } from '../../../common/dto/paginated-response.dto';

export class GetAllHistoryDto {
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

export class GetHistoryUserItem {
  @ApiProperty()
  id!: number;

  @ApiProperty()
  fullName!: string;

  @ApiProperty()
  email!: string;

  @ApiProperty()
  role!: string;
}

export class GetHistoryConcertItem {
  @ApiProperty()
  id!: number;

  @ApiProperty()
  name!: string;

  @ApiProperty()
  description!: string;

  @ApiProperty()
  totalSeats!: number;
}

export class GetAllHistoryItem {
  @ApiProperty()
  id!: number;

  @ApiProperty()
  status!: string;

  @ApiProperty()
  action!: string;

  @ApiProperty()
  createdAt!: Date;

  @ApiProperty()
  updatedAt!: Date;

  @ApiProperty({ type: GetHistoryUserItem })
  user!: GetHistoryUserItem;

  @ApiProperty({ type: GetHistoryConcertItem })
  concert!: GetHistoryConcertItem;
}

export class GetAllHistoryResponse {
  @ApiProperty({ type: [GetAllHistoryItem] })
  items!: GetAllHistoryItem[];

  @ApiProperty({ example: 100 })
  meta!: PaginationMetaDto;
}
