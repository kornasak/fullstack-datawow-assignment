import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsString, Min } from 'class-validator';

export class CreateConcertDto {
  @ApiProperty({ example: 'Bangkok Music Night' })
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiProperty({ example: 'Free concert ticket event' })
  @IsString()
  @IsNotEmpty()
  description!: string;

  @ApiProperty({ example: 100, minimum: 1 })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  totalSeats!: number;
}

export class CreateConcertResponse {
  @ApiProperty()
  id!: number;

  @ApiProperty()
  name!: string;

  @ApiProperty()
  description!: string;

  @ApiProperty()
  totalSeats!: number;

  @ApiProperty()
  createdAt!: Date;

  @ApiProperty()
  updatedAt!: Date;
}
