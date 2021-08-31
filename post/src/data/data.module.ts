import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DataController } from './controller/data.controller';
import { DataSchema } from './schemas/data.schema';
import { DataService } from './service/data.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'row', schema: DataSchema }])],
  controllers: [DataController  ],
  providers: [DataService]
})
export class DataModule {}
