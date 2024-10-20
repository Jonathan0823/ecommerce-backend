import { Body, Controller, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { UpdateUserDto } from './dto/user.dto';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}

    @UseGuards(JwtGuard)
    @Get(":id")
    async getUserProfile(@Param("id") id: string) {
        return await this.userService.findbyId(id);
    }

    @UseGuards(JwtGuard)
    @Patch(":id")
    async updateUserProfile(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
        return await this.userService.updateUserProfile(id, updateUserDto);
    }

}
