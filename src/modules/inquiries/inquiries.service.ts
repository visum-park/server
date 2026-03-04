import { Inject, Injectable } from '@nestjs/common';
import { CreateInquiryDto } from './dto/create-inquiry.dto';
import { TICKET_PROVIDER } from './ticket-provider.interface';
import type { TicketProvider } from './ticket-provider.interface';

@Injectable()
export class InquiriesService {
  constructor(
    @Inject(TICKET_PROVIDER)
    private readonly ticketProvider: TicketProvider,
  ) {}

  async createInquiry(data: CreateInquiryDto): Promise<void> {
    await this.ticketProvider.createTicket(data);
  }
}
