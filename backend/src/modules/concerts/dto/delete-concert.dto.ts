import { ApiProperty } from '@nestjs/swagger';

export class DeleteConcertResponse {
  @ApiProperty()
  message!: string;
}
