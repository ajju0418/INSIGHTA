import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
    @ApiProperty({ example: 'admin@nexura.com' })
    email: string;

    @ApiProperty({ example: 'nexura123' })
    password: string;
}
