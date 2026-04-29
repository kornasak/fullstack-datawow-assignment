import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../../generated/prisma';

export class UserDto {
  @ApiProperty({ example: 1 })
  id!: number;

  @ApiProperty({ example: 'John Doe' })
  fullName!: string;

  @ApiProperty({ example: 'john.doe@example.com' })
  email!: string;

  @ApiProperty({ example: 'user' })
  role!: Role;
}
