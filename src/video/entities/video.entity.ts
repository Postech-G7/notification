import { Schema, Document, model } from 'mongoose';

export interface Video extends Document {
  user_id: string;
  title: string;
  uploader: string;
  base64: string;
  createdAt: Date;
}

export const VideoSchema = new Schema({
  user_id: { type: String, required: true },
  title: { type: String, required: true },
  uploader: { type: String, required: true },
  base64: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
}, { collection: 'video' }); // Specify the collection name here

export const Video = model<Video>('Video', VideoSchema);