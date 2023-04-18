import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { WorkModule } from './work/work.module';
import { SkillModule } from './skill/skill.module';
import { UploadModule } from './modules/upload/upload.module';

@Module({
  imports: [UserModule, AuthModule, UploadModule, MongooseModule.forRoot('mongodb://127.0.0.1:27017/fornode27'), WorkModule, SkillModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
 