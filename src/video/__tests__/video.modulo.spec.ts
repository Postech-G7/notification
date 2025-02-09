import { Test } from '@nestjs/testing';
import { VideoModule } from '../video.module';
import { VideoService } from '../video.service';
import { MongooseModule } from '@nestjs/mongoose';
import { getModelToken } from '@nestjs/mongoose';
import { Video, VideoSchema } from '../entities/video.entity';

describe('VideoModule', () => {
  let videoService: VideoService;
  let moduleRef: any;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot('mongodb://localhost:27017/testdb'), // Mock do MongoDB
        MongooseModule.forFeature([{ name: Video.name, schema: VideoSchema }]),
        VideoModule,
      ],
    }).compile();

    // Remova o argumento de tipo e use `as`
    videoService = moduleRef.get(VideoService) as VideoService;
  });

  it('should be defined', () => {
    expect(videoService).toBeDefined();
  });

  it('should provide VideoService', () => {
    expect(videoService).toBeInstanceOf(VideoService);
  });

  it('should configure MongooseModule with correct schema', () => {
    const model = moduleRef.get(getModelToken(Video.name));
    expect(model).toBeDefined();
  });
});
