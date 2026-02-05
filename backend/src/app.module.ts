import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service.js';
import { BoardsController } from './boards/boards.controller';
import { BoardsModule } from './boards/boards.module';
import { BoardsService } from './boards/boards.service';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: '.env',
  }), BoardsModule],
  controllers: [AppController, BoardsController],
  providers: [AppService, PrismaService, BoardsService],
})
export class AppModule {}
