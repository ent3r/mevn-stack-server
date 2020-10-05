import { Schema, Document, model } from "mongoose";

export interface IPostSchema {
  title: string;
  body: string;
  author: string;
  publishedAt: Date;
  lastEditedAt: Date;
}

export const PostSchema = new Schema<IPostSchema>({
  title: String,
  body: String,
  author: String,
  publishedAt: Date,
  lastEditedAt: Date,
});

export interface IPostModel extends Document {
  title: string;
  body: string;
  author: string;
  publishedAt: Date;
  lastEditedAt: Date;
}

export const PostModel = model<IPostModel>("post", PostSchema);

export default PostModel;
