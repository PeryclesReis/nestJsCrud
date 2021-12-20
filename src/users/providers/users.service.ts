import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { Prisma, Users } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async user(id: number): Promise<Users | null> {
    return this.prisma.users.findUnique({ where: { id } });
  }

  async users(): Promise<Users[]> {
    return this.prisma.users.findMany();
  }

  async createUser(data: Prisma.UsersCreateInput): Promise<Users> {
    return this.prisma.users.create({
      data,
    });
  }

  async updateUser(id: number, data: Prisma.UsersUpdateInput): Promise<Users> {
    return this.prisma.users.update({ where: { id }, data });
  }

  async deleteUser(id: number): Promise<Users> {
    return this.prisma.users.delete({ where: { id } });
  }

  async findOne(email: string): Promise<Users | undefined> {
    return this.prisma.users.findUnique({ where: { email } });
  }
}
