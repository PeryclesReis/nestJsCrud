import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { CatsService } from '../providers/cats.service';
import { CreateCatDto } from '../dto/create-cat.dto';
import { UpdateCatDto } from '../dto/update-cat.dto';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Post()
  async create(@Body() data: CreateCatDto) {
    const result = await this.catsService.create({ data });
    return {
      code: 202,
      message: 'cat criado com sucesso',
      result,
    };
  }

  @Get()
  async findAll() {
    const result = await this.catsService.findMany();
    if (!result) {
      return {
        error: {
          code: 404,
          message: 'not exist cats',
        },
      };
    }

    return {
      code: 200,
      result,
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const result = await this.catsService.findOne(+id);
    if (!result) {
      return {
        error: {
          code: 404,
          message: 'not exist cats',
        },
      };
    }

    return {
      code: 200,
      result,
    };
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() data: UpdateCatDto) {
    const result = await this.catsService.findOne(+id);
    if (!result) {
      throw new NotFoundException();
    }

    this.catsService.update(+id, data);

    return {
      code: 204,
      message: 'cat atualizado com sucesso',
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const catExists = await this.catsService.findOne(+id);
    if (!catExists) {
      throw new NotFoundException('testando');
    }

    await this.catsService.remove(+id);

    return {
      code: 201,
      message: 'cat removido com sucesso',
    };
  }
}
