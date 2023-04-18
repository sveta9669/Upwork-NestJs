import { Prop } from "@nestjs/mongoose";
import { raw, Schema, SchemaFactory } from "@nestjs/mongoose/dist";
import mongoose, { HydratedDocument } from "mongoose";
import { type } from "os";
import { Skill } from "src/skill/entities/skill.entity";
import { User } from "src/user/entities/user.entity";

export type WorkDocument = HydratedDocument<Work>

@Schema()
export class Work {
    @Prop()
    name: string
    @Prop()
    price: number;
    @Prop()
    deadline: string
    @Prop()
    description: string;
    @Prop({
        type: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Skill"
            }]
    })
    skill: Skill[];
    @Prop({
        type: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            }]
    })
    apply: User[];


    @Prop({
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    })
    user: User;

}

export const WorkSchema = SchemaFactory.createForClass(Work)