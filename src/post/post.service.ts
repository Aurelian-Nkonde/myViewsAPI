import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PrismaService } from 'src/prisma.service';
import { PostEntity } from './entities/post.entity';
import GenerateUniqueId, { IdType } from 'src/utils/generateUniqueId';

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}

  async createPost(createPostDto: CreatePostDto): Promise<PostEntity> {
    const data = await this.prisma.post.create({
      data: {
        id: GenerateUniqueId(IdType.POST_ID),
        ...createPostDto,
      },
    });
    if (!data) {
      throw new InternalServerErrorException();
    }
    return data;
  }

  async getPost(id: string): Promise<PostEntity> {
    const post = await this.prisma.post.findFirst({
      where: {
        id: id,
      },
    });
    if (!post) {
      throw new InternalServerErrorException();
    }
    return post;
  }

  async getAllPosts(): Promise<PostEntity[]> {
    return await this.prisma.post.findMany();
  }

  async getUserPosts(id: string): Promise<PostEntity[]> {
    return await this.prisma.post.findMany({
      where: {
        userId: id,
      },
    });
  }

  async deletePost(id: string): Promise<void> {
    const post = await this.prisma.post.findFirst({ where: { id: id } });
    if (!post) {
      throw new NotFoundException();
    }
    const deleted = await this.prisma.post.delete({ where: { id: post.id } });
    if (!deleted) {
      throw new InternalServerErrorException();
    }
    return;
  }
}
