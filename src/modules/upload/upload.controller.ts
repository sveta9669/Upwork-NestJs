import { Controller, Post, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { FilesInterceptor } from "@nestjs/platform-express";
import { multerOptions } from "./config";

@Controller('upload')
export class UploadContorller{
     
    @Post()
    @UseInterceptors(FilesInterceptor('file',null, multerOptions))
    async uploadFile(@UploadedFiles() file){
         console.log(file);
         return file
    }
}