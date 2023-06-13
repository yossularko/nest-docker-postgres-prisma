import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseInterceptors,
} from '@nestjs/common';
import { TweetsService } from './tweets.service';
import { CreateTweetDto } from './dto/create-tweet.dto';
import { UpdateTweetDto } from './dto/update-tweet.dto';
import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';

@Controller('tweets')
export class TweetsController {
  constructor(private readonly tweetsService: TweetsService) {}

  @Post()
  create(@Body() createTweetDto: CreateTweetDto) {
    return this.tweetsService.create(createTweetDto);
  }

  @UseInterceptors(CacheInterceptor)
  @CacheTTL(1000 * 60)
  @Get()
  findAll() {
    return this.tweetsService.findAll();
  }

  @UseInterceptors(CacheInterceptor)
  @CacheTTL(1000 * 60)
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.tweetsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTweetDto: UpdateTweetDto,
  ) {
    return this.tweetsService.update(id, updateTweetDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.tweetsService.remove(id);
  }
}
