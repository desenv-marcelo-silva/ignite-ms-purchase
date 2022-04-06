import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from 'src/database/database.module';
import { ItsokController } from './itsok.controller';

@Module({
  imports: [ConfigModule.forRoot(), DatabaseModule],
  controllers: [ItsokController],
})
export class HttpModule {}
