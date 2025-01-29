import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Video } from './entities/video.entity';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class VideoService {
  constructor(@InjectModel(Video.name) private readonly videoModel: Model<Video>) {}

  async uploadVideo(file: Express.Multer.File, jwtToken: string): Promise<Video> {
    if (!file || !file.buffer) {
      throw new Error('File is missing or invalid');
    }
    console.log('Received file:', file); // Log the file for debugging
    try {
      //console.log('JWT Token:', jwtToken); // Log the token for debugging
      const decodedToken = jwt.verify(jwtToken, process.env.JWT_SECRET) as { id: string, email: string };
      console.log('Decoded Token:', decodedToken); // Log the decoded token for debugging

      const video = new this.videoModel({
        title: file.originalname, // Provide a title
        uploader: decodedToken.email, // Provide an uploader
        base64: file.buffer.toString('base64'), // Convert file buffer to base64
        user_id: decodedToken.id, // Use the user ID from the decoded token
      });
      return video.save();
    } catch (error) {
      console.error('Token verification failed:', error.message);
      throw new Error('Invalid token');
    }
  }
}