import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import User from './entities/users.entity';
import { v4 as uuid } from 'uuid';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const salt = await bcrypt.genSalt();

    const newUser = this.usersRepository.create({
      ...createUserDto,
      password: await bcrypt.hash(createUserDto.password, salt),
      company_id: uuid()
    });

    this.usersRepository.save(newUser);
  }

  async findOne(email: string): Promise<User | undefined> {
    return this.usersRepository.findOneBy({
      email: email,
    });
  }
}
