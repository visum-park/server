import { Module } from '@nestjs/common';
import { InquiriesController } from './inquiries.controller';
import { InquiriesService } from './inquiries.service';
import { ZohoDeskProvider } from './zoho-desk.provider';
import { TICKET_PROVIDER } from './ticket-provider.interface';

@Module({
  controllers: [InquiriesController],
  providers: [
    InquiriesService,
    {
      provide: TICKET_PROVIDER,
      useClass: ZohoDeskProvider,
    },
  ],
})
export class InquiriesModule {}
