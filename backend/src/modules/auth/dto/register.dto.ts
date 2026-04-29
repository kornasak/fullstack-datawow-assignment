import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { Role } from '../../../generated/prisma';

export class RegisterDto {
  @ApiProperty({ example: 'John Doe' })
  @IsString()
  @IsNotEmpty()
  fullName!: string;

  @ApiProperty({ example: 'john.doe@example.com' })
  @IsNotEmpty()
  @IsEmail()
  email!: string;

  @ApiProperty({ example: '123456', minLength: 6 })
  @MinLength(6)
  @IsNotEmpty()
  password!: string;

  @ApiPropertyOptional({
    enum: Role,
    example: Role.USER,
  })
  @IsOptional()
  @IsEnum(Role)
  role?: Role;
}

export class RegisterResponse {
  @ApiProperty({ example: 'Register success' })
  message!: string;

  @ApiProperty({
    example: {
      id: 1,
      fullName: 'John Doe',
      email: '',
      role: Role.USER,
      createdAt: '2024-01-01T00:00:00.000Z',
    },
  })
  user!: {
    id: number;
    fullName: string;
    email: string;
    role: Role;
    createdAt: Date;
  };
}
