import { Module } from '@nestjs/common';
import { HealthController } from './health/health.controller';
import { RoomsModule } from './modules/rooms/rooms.module';
import { BookingsModule } from './modules/bookings/bookings.module';
import { AvailabilityModule } from './modules/availability/availability.module';
import { RestaurantModule } from './modules/restaurant/restaurant.module';
import { QuotesModule } from './modules/quotes/quotes.module';
import { PaymentsModule } from './modules/payments/payments.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [RoomsModule, BookingsModule, AvailabilityModule, RestaurantModule, QuotesModule, PaymentsModule, UsersModule],
  controllers: [HealthController],
})
export class AppModule {}
