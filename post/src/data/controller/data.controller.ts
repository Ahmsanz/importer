import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { DataService } from '../service/data.service';
import { Express } from 'express';
import 'multer'; 

@Controller('data')
export class DataController {
    constructor(
        private dataService: DataService
    ) {}
    
    @Post()
    @UseInterceptors(FileInterceptor('file', {
        dest: './files',
        preservePath: true
    }))
    async postFile(
        @UploadedFile() file: Express.Multer.File
    ): Promise<string> {
        await this.dataService.handleFile();

        return `The data from ${file.originalname} is being copied into the database. \n You will be able to check all the information momentarily.`;
    }
}
