import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose/dist/mongoose.module';
import { User, UserSchema } from './entities/user.entity';
import { Work, WorkSchema } from 'src/work/entities/work.entity';
import { Skill, SkillSchema } from 'src/skill/entities/skill.entity';

@Module({
  imports:[MongooseModule.forFeature([{ name: User.name, schema: UserSchema }, { name: Work.name, schema:WorkSchema}, {name: Skill.name, schema:SkillSchema}])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule { }
