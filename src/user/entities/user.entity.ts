import { Prop } from "@nestjs/mongoose";
import { raw, Schema, SchemaFactory } from "@nestjs/mongoose/dist";
import mongoose, { HydratedDocument } from "mongoose";
import { type } from "os";
import { Skill } from "src/skill/entities/skill.entity";
import { Work } from "src/work/entities/work.entity";
import { RolesTypes } from "../role/enum.role";

export type UserDocument = HydratedDocument<User>

@Schema()
export class User {
    // @Prop()
    // count:number;
    // @Prop({type:Date})
    // blocktime:Date;
    // // blocktime:Record<Date | number>;
    @Prop()
    name:string
    @Prop()
    surname:string;
    @Prop()
    age:number
    @Prop()
    pic_url:string;
    @Prop()
    email:string;
    @Prop()
    password:string;
    @Prop()
    emailtoken:string;
    @Prop({default:0})
    isVerify:number;
    @Prop({type:["ADMIN", "USER"]})
    roles:RolesTypes[]
    @Prop()
    skill: Skill[];
    
    @Prop({type:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Work"
    }]})
    customerWorks:Work[]
    @Prop({type:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Work"
    }]})
    freelancerWorks:Work[]
    @Prop({type:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Work"
    }]})
    applyWorks:Work[]

}

export const UserSchema= SchemaFactory.createForClass(User)