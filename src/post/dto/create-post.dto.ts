import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreatePostDto {
  @IsNotEmpty()
  @IsString()
  @Length(20)
  userId: string;

  @IsNotEmpty()
  image: string;

  @IsNotEmpty()
  @IsString()
  text: string;
}
