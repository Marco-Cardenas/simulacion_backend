import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CrudModule } from './crud/crud.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [CrudModule, MongooseModule.forRoot('mongodb+srv://landingPageBD:landingPageBD2025Web@cluster0.7wc3n.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
