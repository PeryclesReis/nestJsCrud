import { Module } from '@nestjs/common';
import { CatsService } from './providers/cats.service';
import { CatsController } from './controllers/cats.controller';
import { PrismaService } from '../database/prisma.service';

@Module({
  controllers: [CatsController],
  providers: [CatsService, PrismaService],
})
export class CatsModule {}
