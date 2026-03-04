import {IsOptional, IsNotEmpty, IsString, ValidateNested, IsNumber} from 'class-validator';
import { Type } from 'class-transformer';

export class ContactDto {
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsString()
  email: string;
}

export class CreateInquiryDto {
  @IsNotEmpty()
  @IsString()
  subject: string;
  @ValidateNested()
  @Type(() => ContactDto)
  contact: ContactDto;

  @IsNotEmpty()
  @IsString()
  phone: string;

  @IsOptional()
  @IsString()
  description?: string;
}
