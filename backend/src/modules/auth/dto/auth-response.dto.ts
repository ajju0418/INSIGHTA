import { ApiProperty } from '@nestjs/swagger';

class UserResponse {
    @ApiProperty()
    id: string;

    @ApiProperty()
    email: string;

    @ApiProperty()
    name: string;

    @ApiProperty()
    userId: string;
}

export class AuthResponseDto {
    @ApiProperty()
    user: UserResponse;

    @ApiProperty()
    accessToken: string;
}
