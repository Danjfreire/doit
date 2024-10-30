import { Injectable } from '@nestjs/common';
import { CreateUserDTO } from './createuser.dto';
import { Repository } from 'typeorm';
import { User } from 'src/_shared/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createUser(dto: CreateUserDTO) {
    const res = await this.userRepository.save({
      firstName: dto.firstName,
      lastName: dto.lastName,
    });

    return res;
  }

  async getUser(id: string): Promise<User | null> {
    const user = await this.userRepository.findOneBy({ id });

    return user;
  }
}
