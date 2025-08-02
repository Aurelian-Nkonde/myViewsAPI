import { IsNotEmpty, Length } from 'class-validator';

export class CreateInforequestDto {
  @IsNotEmpty()
  @Length(18)
  postId: string;

  @IsNotEmpty()
  @Length(20)
  userId: string;
}
