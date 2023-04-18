import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose/dist';
import { Model } from 'mongoose';
import { Work, WorkDocument } from 'src/work/entities/work.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './entities/user.entity';
import * as bcrypt from 'bcrypt'
import { Skill, SkillDocument } from 'src/skill/entities/skill.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Work.name) private workModel: Model<WorkDocument>,
    @InjectModel(Skill.name) private skillModel: Model<SkillDocument>) {

  }
  create(createUserDto: CreateUserDto) {
    console.log(createUserDto);
    const us = this.userModel.findOne({ email: createUserDto.email })
    if (!us) {
      return "Change email"
    } else {
      const hash = bcrypt.hashSync(createUserDto.password, 10)
      const user = new this.userModel({ ...createUserDto, password: hash })
      return user.save();
    }

  }
  async findOneByEmail(username: string) {
    return this.userModel.findOne({ email: username });
  }

  findAll() {
    return this.userModel.find();
  }
  

  async applyWork(id: string, userId: string) {
    const work = await this.workModel.findById(id)
    const user = await this.userModel.findById(userId)
    const workupdate = await this.workModel.findByIdAndUpdate(id, { apply: [...work.apply, userId] })
    const userupdate = await this.userModel.findByIdAndUpdate(userId, { applyWorks: [...user.applyWorks, id] })
    return { workupdate, userupdate }
  }

  async confirm(workId, userId: string) {
    const user = await this.userModel.findById(userId)
    const applyWorks = user.applyWorks.filter(id => id != workId)
    const userupdate = await this.userModel.findByIdAndUpdate(userId, { applyWorks })
    const addFreelanceWork = await this.userModel.findByIdAndUpdate(userId, { freelancerWorks: [...user.freelancerWorks, workId] })
    return "Work confirmed"
  }

  async reject(workId, userId: string) {
    const user = await this.userModel.findById(userId)
    const applyWorks = user.applyWorks.filter(id => id != workId)
    const userupdate = await this.userModel.findByIdAndUpdate(userId, { applyWorks })
    return "Work rejected"
  }


  async updatePhoto(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.userModel.findById(id)
    console.log(updateUserDto);

    const hash = bcrypt.hashSync(updateUserDto.password, 10)
    await this.userModel.findByIdAndUpdate(id, { ...updateUserDto, password: hash })
    if (user) {
      return await this.userModel.findByIdAndUpdate(id, updateUserDto)
    } else {
      throw new HttpException(`User with this #${id} not found`, HttpStatus.NOT_FOUND);
    }
  }
  async addSkill(userId: string, skillId: string[]) {
    console.log(...skillId);

    const user = await this.userModel.findById(userId)
    await this.userModel.findByIdAndUpdate(userId, { skill: [...user.skill, ...skillId] })
    return "update";
  }

  remove(id: string) {
    return `This action removes a #${id} user`;
  }
}
