import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose'

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [
    ProductsModule, 
    ConfigModule.forRoot(),
    MongooseModule.forRoot(
      ".env",
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
