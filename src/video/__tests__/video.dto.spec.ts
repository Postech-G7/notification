import { Video } from '../dto/video.dto';

describe('Video', () => {
  it('should create an instance of Video with valid properties', () => {
    const video = new Video();
    video.user_id = 'user123';
    video.id = 'video456';
    video.title = 'Test Video';
    video.uploader = 'John Doe';
    video.base64 = 'base64-encoded-string';
    video.createdAt = new Date();

    expect(video).toBeInstanceOf(Video);
    expect(video.user_id).toBe('user123');
    expect(video.id).toBe('video456');
    expect(video.title).toBe('Test Video');
    expect(video.uploader).toBe('John Doe');
    expect(video.base64).toBe('base64-encoded-string');
    expect(video.createdAt).toBeInstanceOf(Date);
  });

  it('should allow optional properties to be undefined', () => {
    const video = new Video();

    expect(video.user_id).toBeUndefined();
    expect(video.id).toBeUndefined();
    expect(video.title).toBeUndefined();
    expect(video.uploader).toBeUndefined();
    expect(video.base64).toBeUndefined();
    expect(video.createdAt).toBeUndefined();
  });

  it('should throw TypeError if invalid types are assigned to properties', () => {
    const video = new Video();

    // Atribuir valores inválidos
    expect(() => {
      (video as any).user_id = 123; // user_id deve ser string
    }).toThrow(TypeError);

    expect(() => {
      (video as any).id = 456; // id deve ser string
    }).toThrow(TypeError);

    expect(() => {
      (video as any).title = 789; // title deve ser string
    }).toThrow(TypeError);

    expect(() => {
      (video as any).uploader = true; // uploader deve ser string
    }).toThrow(TypeError);

    expect(() => {
      (video as any).base64 = null; // base64 deve ser string
    }).toThrow(TypeError);

    expect(() => {
      (video as any).createdAt = 'invalid-date'; // createdAt deve ser Date
    }).toThrow(TypeError);
  });
});
