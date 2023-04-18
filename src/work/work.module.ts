import { Module } from '@nestjs/common';
import { WorkService } from './work.service';
import { WorkController } from './work.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Work, WorkSchema } from './entities/work.entity';
import { User, UserSchema } from 'src/user/entities/user.entity';

@Module({
  imports:[MongooseModule.forFeature([{name: Work.name, schema: WorkSchema}, , { name: User.name, schema: UserSchema }])],
  controllers: [WorkController],
  providers: [WorkService]
})
export class WorkModule {}
