import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Request, Res, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common/decorators';
import { AuthGuard } from '@nestjs/passport';
import { FilesInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/modules/upload/config';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }
  // @Get("/by/:id")
  // findOne(@Param('id') id:string) {
  //   return this.userService.findOne(id);
  // }

  @UseGuards(AuthGuard('jwt'))
  @Patch("upload")
  @UseInterceptors(FilesInterceptor('file', null, multerOptions))
  async updatePhoto(@Body() body, @UploadedFiles() file, @Request() req, @Res() res) {
    console.log(file);
    if (req.user) {
      if(file[0]){
        await this.userService.updatePhoto(req.user.userId, {...body, picURL:file[0].filename})
      }else{
        await this.userService.updatePhoto(req.user.userId, {...body})
      }
      return res.status(HttpStatus.OK).json({ message: "ok" })
    } else {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: "bad request" })
    }
  }


  @UseGuards(AuthGuard('jwt'))
  @Post('applywork/:id')
  applyWork(@Param("id") id: string, @Request() req) {
    // console.log(id, req.user);
    if (req.user?.roles.includes("USER")) {
      return this.userService.applyWork(id, req.user.userId)
    } else {
      return "you cannot apply for this work"
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('confirmWork/:workId/:userId')
  confirm(@Param("workId") workId: string, @Param("userId") userId: string, @Request() req){
    if (req.user?.roles.includes("ADMIN")) {
      return this.userService.confirm(workId, userId)
    } else {
      return "you cannot apply for this work"
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('rejectWork/:workId/:userId')
  reject(@Param("workId") workId: string, @Param("userId") userId: string, @Request() req){
    if (req.user?.roles.includes("ADMIN")) {
      return this.userService.confirm(workId, userId)
    } else {
      return "you cannot apply for this work"
    }
  }
  @UseGuards(AuthGuard('jwt'))
  @Post('addskill')
  addSkill(@Body() body, @Request() req){
    console.log(body);
    
    if (req.user?.roles.includes("USER")) {
      return this.userService.addSkill(req.user.userId, body.skills)
    } else {
      return "you cannot apply for this work"
    } 
  }



  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
