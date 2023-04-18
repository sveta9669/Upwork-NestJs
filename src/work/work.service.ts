import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/user/entities/user.entity';
import { CreateWorkDto } from './dto/create-work.dto';
import { UpdateWorkDto } from './dto/update-work.dto';
import { Work, WorkDocument } from './entities/work.entity';

@Injectable()
export class WorkService {
  constructor(
    @InjectModel(Work.name) private workModel: Model<WorkDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>

  ) { }

  async create(createWorkDto: CreateWorkDto, userId: string) {
    const work = new this.workModel({ ...createWorkDto, user: userId })
    const user = await this.userModel.findById(userId)
    console.log('work====>', work)
    console.log("user===>", user);
    await this.userModel.findByIdAndUpdate(userId,
      { customerWorks: [...user.customerWorks, work.id] }
    )

    return work.save()
  }

  async findAll() {
    const works = await this.workModel.find()
    return works;
  }

  findOne(id: number) {
    return `This action returns a #${id} work`;
  }

  update(id: number, updateWorkDto: UpdateWorkDto) {
    return `This action updates a #${id} work`;
  }

  remove(id: number) {
    return `This action removes a #${id} work`;
  }
}
