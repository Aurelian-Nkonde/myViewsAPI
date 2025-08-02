import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { AccountService } from './account.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { AccountEntity } from './entities/account.entity';

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post()
  async createAccount(
    @Body() createAccountDto: CreateAccountDto,
  ): Promise<AccountEntity> {
    return await this.accountService.createAccount(createAccountDto);
  }

  @Get('all/accounts')
  async getAccounts(): Promise<AccountEntity[]> {
    return await this.accountService.getAccounts();
  }

  @Get('/details/:id')
  async getAccount(@Param('id') id: string): Promise<AccountEntity> {
    return await this.accountService.getAccount(id);
  }

  @Put('verify/email/:id')
  async verifyEmail(@Param('id') id: string): Promise<AccountEntity> {
    return await this.accountService.verifyEmail(id);
  }
}
