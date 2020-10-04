import { Schema, Document, model } from "mongoose";

export interface IPostSchema {
  title: string;
  body: string;
  publishedAt: Date;
  lastEditedAt: Date;
  author: string;
}

export const PostSchema = new Schema<IPostSchema>({
  title: String,
  body: String,
  publishedAt: Date,
  lastEditedAt: Date,
  author: String,
});

export interface IPostModel extends Document {
  title: string;
  body: string;
  publishedAt: Date;
  lastEditedAt: Date;
  author: string;
}

export const PostModel = model<IPostModel>("post", PostSchema);

export default PostModel;
