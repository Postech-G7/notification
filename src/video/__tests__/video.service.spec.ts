import { Test } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { VideoService } from '../video.service';
import { Video } from '../entities/video.entity';
import * as jwt from 'jsonwebtoken';

describe('VideoService', () => {
  let videoService: VideoService;
  let videoModelMock: any;

  // Mock da variável de ambiente JWT_SECRET
  beforeAll(() => {
    process.env.JWT_SECRET = 'mocked-secret';
  });

  beforeEach(async () => {
    // Mock do modelo Mongoose
    videoModelMock = {
      create: jest.fn(),
    };

    const module = await Test.createTestingModule({
      providers: [
        VideoService,
        {
          provide: getModelToken(Video.name),
          useValue: videoModelMock,
        },
      ],
    }).compile();

    videoService = module.get<VideoService>(VideoService);
  });

  describe('uploadVideo', () => {
    it('should upload a video with valid file and token', async () => {
      // Arrange
      const mockFile: Express.Multer.File = {
        originalname: 'test-video.mp4',
        buffer: Buffer.from('fake-video-data'), // Buffer contendo dados fictícios
        mimetype: 'video/mp4', // Tipo MIME opcional
        size: 1024, // Tamanho opcional
        fieldname: 'file', // Nome do campo opcional
        encoding: '7bit', // Codificação opcional
        destination: '/uploads', // Destino opcional
        filename: 'test-video.mp4', // Nome do arquivo opcional
        path: '/uploads/test-video.mp4', // Caminho opcional
        stream: null, // Stream opcional
      };
      const mockJwtToken = jwt.sign(
        {
          id: '123',
          email: 'test@example.com',
        },
        process.env.JWT_SECRET,
      );

      videoModelMock.create.mockResolvedValue({
        title: mockFile.originalname,
        uploader: 'test@example.com',
        base64: mockFile.buffer.toString('base64'),
        user_id: '123',
      });

      // Act
      const result = await videoService.uploadVideo(mockFile, mockJwtToken);

      // Assert
      expect(videoModelMock.create).toHaveBeenCalledWith({
        title: mockFile.originalname,
        uploader: 'test@example.com',
        base64: mockFile.buffer.toString('base64'),
        user_id: '123',
      });
      expect(result).toEqual({
        title: mockFile.originalname,
        uploader: 'test@example.com',
        base64: mockFile.buffer.toString('base64'),
        user_id: '123',
      });
    });

    it('should throw an error if the file is missing or invalid', async () => {
      // Arrange
      const mockJwtToken = jwt.sign(
        { id: '123', email: 'test@example.com' },
        process.env.JWT_SECRET,
      );

      // Act & Assert
      await expect(
        videoService.uploadVideo(null, mockJwtToken),
      ).rejects.toThrow('File is missing or invalid');
    });

    it('should throw an error if the JWT token is invalid', async () => {
      // Arrange
      const mockFile: Express.Multer.File = {
        originalname: 'test-video.mp4',
        buffer: Buffer.from('fake-video-data'),
        mimetype: 'video/mp4',
        size: 1024,
        fieldname: 'file',
        encoding: '7bit',
        destination: '/uploads',
        filename: 'test-video.mp4',
        path: '/uploads/test-video.mp4',
        stream: null,
      };
      const invalidJwtToken = 'invalid-token';

      // Act & Assert
      await expect(
        videoService.uploadVideo(mockFile, invalidJwtToken),
      ).rejects.toThrow('Invalid token');
    });
  });
});
