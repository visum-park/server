import { CreateInquiryDto } from './dto/create-inquiry.dto';

export interface TicketProvider {
  createTicket(data: CreateInquiryDto): Promise<void>;
}

export const TICKET_PROVIDER = 'TICKET_PROVIDER';
