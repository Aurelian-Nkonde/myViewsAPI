import { PartialType } from '@nestjs/mapped-types';
import { CreateInforequestDto } from './create-inforequest.dto';

export class UpdateInforequestDto extends PartialType(CreateInforequestDto) {}
