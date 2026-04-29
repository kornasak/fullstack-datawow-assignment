import { ApiProperty } from '@nestjs/swagger';

export class PaginationMetaDto {
  @ApiProperty()
  total!: number;

  @ApiProperty()
  totalPages!: number;

  @ApiProperty()
  page!: number;

  @ApiProperty()
  limit!: number;
}

export class PaginatedResponseDto<T> {
  @ApiProperty()
  items!: T[];

  @ApiProperty()
  meta!: PaginationMetaDto;
}
