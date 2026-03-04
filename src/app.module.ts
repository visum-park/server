import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HealthController } from './health/health.controller';
import { RoomsModule } from './modules/rooms/rooms.module';
import { BookingsModule } from './modules/bookings/bookings.module';
import { AvailabilityModule } from './modules/availability/availability.module';
import { RestaurantModule } from './modules/restaurant/restaurant.module';
import { QuotesModule } from './modules/quotes/quotes.module';
import { PaymentsModule } from './modules/payments/payments.module';
import { UsersModule } from './modules/users/users.module';
import { InquiriesModule } from './modules/inquiries/inquiries.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    RoomsModule,
    BookingsModule,
    AvailabilityModule,
    RestaurantModule,
    QuotesModule,
    PaymentsModule,
    UsersModule,
    InquiriesModule,
  ],
  controllers: [HealthController],
})
export class AppModule {}
