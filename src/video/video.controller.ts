import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { VideoService } from './video.service';
import { diskStorage } from 'multer';

@Controller('video')
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, cb) => {
        const filename: string = file.originalname;
        cb(null, filename);
      },
    })
  }))
    
  uploadVideo(@UploadedFile() file: Express.Multer.File) {
    const video = this.videoService.uploadVideo(file);
    return {message: 'Video uploaded successfully', video};
  }
}
