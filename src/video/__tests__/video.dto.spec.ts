import { Video } from '../entities/video.entity';

describe('Video', () => {
  let video: Video;

  beforeEach(() => {
    video = new Video();
    video.user_id = '123';
    video.title = 'Test Video';
    video.uploader = 'test@example.com';
    video.base64 = 'base64-encoded-data';
    video.createdAt = new Date('2023-10-01T00:00:00Z');
  });

  it('should create an instance of Video', () => {
    expect(video).toBeInstanceOf(Video);
  });

  it('should have the correct properties', () => {
    expect(video.user_id).toBe('123');
    expect(video.id).toBeDefined(); // Verifica se o ID foi gerado
    expect(typeof video.id).toBe('string'); // Verifica se o ID é uma string
    expect(video.title).toBe('Test Video');
    expect(video.uploader).toBe('test@example.com');
    expect(video.base64).toBe('base64-encoded-data');
    expect(video.createdAt).toEqual(new Date('2023-10-01T00:00:00Z'));
  });

  it('should allow updating properties', () => {
    video.title = 'Updated Video Title';
    video.uploader = 'updated@example.com';

    expect(video.title).toBe('Updated Video Title');
    expect(video.uploader).toBe('updated@example.com');
  });
});
