import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { AuthGuard } from './auth.guard';

@Module({
  imports: [ConfigModule, JwtModule],
  providers: [AuthGuard],
  exports: [AuthGuard],
})
export class SharedModule {}
