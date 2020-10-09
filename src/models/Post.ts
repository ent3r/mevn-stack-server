import { Schema, Document, model } from "mongoose";

export interface IPostSchema {
  title: string;
  body: string;
  author: string;
  publishedAt: Date;
  lastEditedAt: Date;
  uuid: string;
}

export const PostSchema = new Schema<IPostSchema>({
  title: String,
  body: String,
  author: String,
  publishedAt: Date,
  lastEditedAt: Date,
  uuid: String,
});

export interface IPostModel extends Document {
  title: string;
  body: string;
  author: string;
  publishedAt: Date;
  lastEditedAt: Date;
  uuid: string;
}

export const PostModel = model<IPostModel>("post", PostSchema);

export default PostModel;
