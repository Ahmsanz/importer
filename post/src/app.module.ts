import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DataModule } from './data/data.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://mongodb:27017/test'), DataModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
