import { Injectable } from '@nestjs/common';

@Injectable()
export class VideoService {
  uploadVideo(file: Express.Multer.File) {
    console.log(file);
    this.saveVideoToDB(file);
  }

  saveVideoToDB(file: Express.Multer.File) {
    // logica para salvar o vídeo no banco de dados
  }
}
