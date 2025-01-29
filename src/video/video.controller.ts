import { Controller, Post, UploadedFile, UseGuards, UseInterceptors, Headers } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { VideoService } from './video.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('upload')
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  @Post('video')
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(FileInterceptor('file'))
  async uploadVideo(@UploadedFile() file: Express.Multer.File, @Headers('authorization') authHeader: string) {
    const jwtToken = authHeader.split(' ')[1]; // Extract the token from the Bearer scheme
    console.log('Received JWT Token:', jwtToken); // Log the token for debugging
    return this.videoService.uploadVideo(file, jwtToken);
  }
}