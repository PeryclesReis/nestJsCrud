import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { Prisma, Cats } from '@prisma/client';

@Injectable()
export class CatsService {
  constructor(private prisma: PrismaService) {}

  async create(params: Prisma.CatsCreateArgs): Promise<Cats> {
    return this.prisma.cats.create(params);
  }

  async findMany(): Promise<Cats[]> {
    const result = await this.prisma.cats.findMany();

    return result;
  }

  async findOne(id: number): Promise<Cats> {
    return await this.prisma.cats.findUnique({ where: { id } });
  }

  async update(id: number, data: Prisma.CatsUpdateInput): Promise<Cats> {
    return await this.prisma.cats.update({
      where: { id },
      data,
    });
  }

  async remove(id: number): Promise<Cats> {
    const result = await this.prisma.cats.delete({ where: { id } });

    return result;
  }
}
