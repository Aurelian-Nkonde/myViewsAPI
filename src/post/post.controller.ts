import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostEntity } from './entities/post.entity';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  async createPost(@Body() createPostDto: CreatePostDto): Promise<PostEntity> {
    return await this.postService.createPost(createPostDto);
  }

  @Get('all')
  async getAllPosts(): Promise<PostEntity[]> {
    return await this.postService.getAllPosts();
  }

  @Get('details/:id')
  async getPost(@Param('id') id: string): Promise<PostEntity> {
    return await this.postService.getPost(id);
  }

  @Get('user/:id/posts')
  async getUserAllPosts(@Param('id') id: string): Promise<PostEntity[]> {
    return await this.postService.getUserPosts(id);
  }

  @Delete('delete/:id')
  async deletePost(@Param('id') id: string): Promise<void> {
    return await this.postService.deletePost(id);
  }
}
