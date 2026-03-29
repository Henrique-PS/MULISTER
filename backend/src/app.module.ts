import { Module } from '@nestjs/common';
import { StreamingModule } from './infrastructure/streaming.module';

@Module({
  imports: [StreamingModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
