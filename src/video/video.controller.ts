import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { VideoService } from './video.service';

@Controller('upload')
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  @Post('video')
  @UseInterceptors(FileInterceptor('file'))
  async uploadVideo(@UploadedFile() file: Express.Multer.File) {
    console.log(file); // Log the file for debugging
    return this.videoService.uploadVideo(file);
  }
}