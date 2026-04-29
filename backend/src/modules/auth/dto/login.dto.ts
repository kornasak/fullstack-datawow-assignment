import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { UserDto } from '../../../common/dto/user.dto';
import { Role } from '../../../generated/prisma';

export class LoginDto {
  @ApiProperty({ example: 'john.doe@example.com' })
  @IsNotEmpty()
  @IsEmail()
  email!: string;

  @ApiProperty({ example: '123456' })
  @MinLength(6)
  @IsNotEmpty()
  password!: string;
}

export class LoginResponse {
  @ApiProperty({ example: 'access_token_example' })
  accessToken!: string;

  @ApiProperty({
    type: UserDto,
    example: {
      id: 1,
      fullName: 'John Doe',
      email: 'john.doe@example.com',
      role: Role.USER,
    },
  })
  user!: UserDto;
}
