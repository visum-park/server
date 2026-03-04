import { Body, Controller, Post } from '@nestjs/common';
import { InquiriesService } from './inquiries.service';
import { CreateInquiryDto } from './dto/create-inquiry.dto';

@Controller('inquiries')
export class InquiriesController {
  constructor(private readonly inquiriesService: InquiriesService) {}

  @Post()
  async create(@Body() body: CreateInquiryDto) {
    await this.inquiriesService.createInquiry(body);
    return { status: 'received' };
  }
}
