import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { WorkService } from './work.service';
import { CreateWorkDto } from './dto/create-work.dto';
import { UpdateWorkDto } from './dto/update-work.dto';
import passport from 'passport';
import { AuthGuard } from '@nestjs/passport';

@Controller('work')
export class WorkController {
  constructor(private readonly workService: WorkService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(@Body() createWorkDto: CreateWorkDto, @Request() req) {
    if(req.user?.roles.includes("ADMIN")){
      return this.workService.create(createWorkDto, req.user.userId);
    }else{
      return {status:'your type invalid'}
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  findAll(@Request() req) {
    if(req.user?.roles.includes("USER")){
      return this.workService.findAll();
    } else {
      return {status:"Your are't have acces to find work"}
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.workService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWorkDto: UpdateWorkDto) {
    return this.workService.update(+id, updateWorkDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.workService.remove(+id);
  }
}
