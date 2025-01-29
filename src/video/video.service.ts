import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Video } from './entities/video.entity';

@Injectable()
export class VideoService {
  constructor(@InjectModel(Video.name) private readonly videoModel: Model<Video>) {}

  async uploadVideo(file: Express.Multer.File, jwtToken: string): Promise<Video> {
    if (!file || !file.buffer) {
      throw new Error('File is missing or invalid');
    }

    const video = new this.videoModel({
      title: file.originalname, // Provide a title
      uploader: 'Sample Uploader', // Provide an uploader
      base64: file.buffer.toString('base64'), // Convert file buffer to base64
      user_id: 'SampleUserId', // Provide a user_id
    });
    return video.save();
  }
}