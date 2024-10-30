import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateUserDTO } from './createuser.dto';
import { UsersService } from './users.service';

@Controller('v1/users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get('/:id')
  async getUser(@Param('id') userId: string) {
    const user = await this.userService.getUser(userId);

    return user;
  }

  @Post()
  async createUser(@Body() dto: CreateUserDTO) {
    const res = await this.userService.createUser(dto);

    return res;
  }
}
