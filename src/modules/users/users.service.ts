// src/modules/users/users.service.ts

import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './repositories/user.repository';

@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: UserRepository,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const existingUser = await this.userRepository.findByEmail(
      createUserDto.email,
    );

    if (existingUser) {
      throw new ConflictException('User already exists');
    }

    const hashedPassword = await bcrypt.hash(
      createUserDto.password,
      10,
    );

    return this.userRepository.create({
      ...createUserDto,
      password: hashedPassword,
      role: 'CLIENTE',
    });
  }

  async findAll() {
    return this.userRepository.findAll();
  }

  async findById(id: string) {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async findByEmail(email: string) {
    return this.userRepository.findByEmail(email);
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ) {
    await this.findById(id);

    const payload: any = {
      ...updateUserDto,
    };

    if (updateUserDto.password) {
      payload.password = await bcrypt.hash(
        updateUserDto.password,
        10,
      );
    }

    return this.userRepository.update(id, payload);
  }

  async remove(id: string) {
    await this.findById(id);

    return this.userRepository.delete(id);
  }
}