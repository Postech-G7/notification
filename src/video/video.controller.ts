import { Controller, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { VideoService } from './video.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('upload')
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  @Post('video')
  @UseGuards(AuthGuard('jwt'))  
  @UseInterceptors(FileInterceptor('file'))
  async uploadVideo(@UploadedFile() file: Express.Multer.File) {
    console.log(file); // Log the file for debugging
    const jwtTpken = file.buffer.toString('base64');
    console.log(jwtTpken); // Log the jwtTpken for debugging
    return this.videoService.uploadVideo(file, jwtTpken);
  }
}