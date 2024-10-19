import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/auth.dto';
import { UserService } from 'src/user/user.service';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private userService: UserService, private jwtService: JwtService) {}
    async login(dto: LoginDto) {
        const user = await this.validateUser(dto);
        const payload = { email: user.email, sub:{
            id: user.id,
            name: user.name,
        } };

        return {
            user,
            backendTokens: {
                accessToken: this.jwtService.sign(payload, {
                    expiresIn: '1h',
                    secret: process.env.jwtSecretkey,
                }),
                refreshToken: this.jwtService.sign(payload, {
                    expiresIn: '7d',
                    secret: process.env.jwtRefreshTokenKey,
                }),
            }
        };
    }

    async validateUser(dto: LoginDto) {
        const user = await this.userService.findbyEmail(dto.email);

        if (user && compare(dto.password, user.password)) {
            const { password, ...result } = user;
            return result;
        }

        throw new UnauthorizedException('Invalid credentials');
    }
}
