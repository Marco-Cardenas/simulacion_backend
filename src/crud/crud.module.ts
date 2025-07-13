import { Module } from '@nestjs/common';
import { CrudService } from './crud.service';
import { CrudController } from './crud.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../base_datos/users.schema';
import { GameSchema } from '../base_datos/games.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'users_s', schema: UserSchema },
      { name: 'games_s', schema: GameSchema }
    ])
  ],
  providers: [CrudService],
  controllers: [CrudController]
})
export class CrudModule {}
