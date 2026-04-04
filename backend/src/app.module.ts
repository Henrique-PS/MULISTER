import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config/dist/config.module';
import { StreamingModule } from './infrastructure/streaming.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: false }), StreamingModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
