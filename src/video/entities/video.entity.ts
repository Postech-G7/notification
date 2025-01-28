import { Schema, Document, model } from 'mongoose';

export interface Video extends Document {
  title: string;
  uploader: string;
  base64: string;
}

export const VideoSchema = new Schema({
  title: { type: String, required: true },
  uploader: { type: String, required: true },
  base64: { type: String, required: true },
}, { collection: 'video' }); // Specify the collection name here

export const Video = model<Video>('Video', VideoSchema);