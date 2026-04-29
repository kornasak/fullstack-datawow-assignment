import { ApiProperty } from '@nestjs/swagger';

export class GetConcertAdminSummaryResponse {
  @ApiProperty()
  totalSeats!: number;

  @ApiProperty()
  reserved!: number;

  @ApiProperty()
  cancelled!: number;
}
