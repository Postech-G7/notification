import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Video } from './entities/video.entity';

@Injectable()
export class VideoService {
  constructor(@InjectModel(Video.name) private videoModel: Model<Video>) {}

  async uploadVideo(file: Express.Multer.File): Promise<Video> {
    const video = new this.videoModel(file);
    return video.save();
  }
}