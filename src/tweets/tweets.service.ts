import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTweetDto } from './dto/create-tweet.dto';
import { UpdateTweetDto } from './dto/update-tweet.dto';

@Injectable()
export class TweetsService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createTweetDto: CreateTweetDto) {
    const { content, imageUrl, published } = createTweetDto;
    try {
      return await this.prismaService.tweets.create({
        data: { content, imageUrl, published },
      });
    } catch (error) {
      throw new HttpException(error, 500, { cause: new Error(error) });
    }
  }

  async findAll() {
    try {
      return await this.prismaService.tweets.findMany();
    } catch (error) {
      throw new HttpException(error, 500, { cause: new Error(error) });
    }
  }

  async findOne(id: number) {
    try {
      return await this.prismaService.tweets.findUnique({ where: { id } });
    } catch (error) {
      throw new HttpException(error, 500, { cause: new Error(error) });
    }
  }

  async update(id: number, updateTweetDto: UpdateTweetDto) {
    const { content, imageUrl, published } = updateTweetDto;
    try {
      return await this.prismaService.tweets.update({
        where: { id },
        data: { content, imageUrl, published },
      });
    } catch (error) {
      throw new HttpException(error, 500, { cause: new Error(error) });
    }
  }

  async remove(id: number) {
    try {
      return await this.prismaService.tweets.delete({ where: { id } });
    } catch (error) {
      throw new HttpException(error, 500, { cause: new Error(error) });
    }
  }
}
