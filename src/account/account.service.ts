import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { PrismaService } from 'src/prisma.service';
import { AccountEntity } from './entities/account.entity';
import GenerateUniqueId, { IdType } from 'src/utils/generateUniqueId';

@Injectable()
export class AccountService {
  constructor(private prisma: PrismaService) {}

  async createAccount(
    createAccountDto: CreateAccountDto,
  ): Promise<AccountEntity> {
    const userExists = await this.prisma.user.findFirst({
      where: {
        email: createAccountDto.email,
      },
    });
    if (userExists) {
      throw new ConflictException('User already exists!');
    }
    const data = await this.prisma.user.create({
      data: {
        id: GenerateUniqueId(IdType.USER_ID),
        active: false,
        email_verified: false,
        ...createAccountDto,
      },
    });
    if (!data) {
      throw new InternalServerErrorException('Error creating a new user!');
    }
    return data;
  }

  async login() {}

  async getAccount(id: string): Promise<AccountEntity> {
    const account = await this.prisma.user.findFirst({ where: { id: id } });
    if (!account) {
      throw new NotFoundException();
    }
    return account;
  }

  async getAccounts(): Promise<AccountEntity[]> {
    return await this.prisma.user.findMany();
  }

  async verifyEmail(id: string): Promise<AccountEntity> {
    const account = await this.prisma.user.findFirst({
      where: {
        id: id,
      },
    });
    if (!account) {
      throw new NotFoundException();
    }
    const updated = await this.prisma.user.update({
      where: {
        id: id,
      },
      data: {
        email_verified: true,
        active: true,
      },
    });
    if (!updated) {
      throw new BadRequestException();
    }
    return updated;
  }
}
