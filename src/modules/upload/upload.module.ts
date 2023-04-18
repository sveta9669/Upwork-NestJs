import { Module } from '@nestjs/common';
import { UploadContorller } from './upload.controller';
import { UploadService } from './upload.service';

@Module({
    imports:[],
    providers:[UploadService],
    controllers:[UploadContorller]
})
export class UploadModule{

}