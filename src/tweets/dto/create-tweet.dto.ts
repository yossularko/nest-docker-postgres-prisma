import { IsBoolean, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateTweetDto {
  @IsNotEmpty()
  content: string;

  @IsOptional()
  imageUrl: string;

  @IsOptional()
  @IsBoolean()
  published: boolean;
}
