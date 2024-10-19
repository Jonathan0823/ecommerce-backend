import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/auth.dto';
import { UserService } from 'src/user/user.service';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

const expiretime = 60*60;
@Injectable()
export class AuthService {
    constructor(private userService: UserService, private jwtService: JwtService) {}
    async login(dto: LoginDto) {
        const user = await this.validateUser(dto);
        const payload = { email: user.email,
            sub: user.id,
            name: user.name,
         };

        return {
            user,
            backendTokens: {
                accessToken: await this.jwtService.signAsync(payload, {
                    expiresIn: '1h',
                    secret: process.env.JWT_SECRET,
                }),
                refreshToken: await this.jwtService.signAsync(payload, {
                    expiresIn: '7d',
                    secret: process.env.JWT_REFRESH_KEY,
                }),
                expiresIn: new Date().setTime(new Date().getTime() + expiretime),
            }
        };
    }

    async validateUser(dto: LoginDto) {
        const user = await this.userService.findbyEmail(dto.email);

        if (user && await compare(dto.password, user.password)) {
            const { password, ...result } = user;
            return result;
        }

        throw new UnauthorizedException('Invalid credentials');
    }

    async refreshToken(user: any) {
        const payload = { 
            email: user.email,
            sub: user.id,
            name: user.name,
         };

         return{
            accessToken: await this.jwtService.signAsync(payload, {
                expiresIn: '1h',
                secret: process.env.JWT_SECRET,
            }),
            refreshToken: await this.jwtService.signAsync(payload, {
                expiresIn: '7d',
                secret: process.env.JWT_REFRESH_KEY,
            }),
            expiresIn: new Date().setTime(new Date().getTime() + expiretime),
         }
    }
}
