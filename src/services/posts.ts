import { IPostModel, PostModel } from "../models/Post";
import Logger from "../loaders/logger";
import { PostInput } from "../types";

export default class PostService {
  /**
   * createNewPost
   * @returns {string} the ID of the new post
   */
  public async createNewPost(postDetails: PostInput): Promise<string> {
    const timeNow = new Date();
    return new PostModel({
      title: postDetails.title,
      body: postDetails.body,
      author: postDetails.author,
      publishedAt: timeNow,
      lastEditedAt: null,
    })
      .save()
      .then((document) => {
        return document._id;
      })
      .catch((err) => {
        Logger.warning(`Failed to create new post. Reason:\n${err}`);
        Promise.reject("Error while saving document");
      });
  }

  /**
   * deletePost
   */
  public async deletePost(postID: string): Promise<void> {
    await PostModel.findByIdAndDelete(postID).then();
    return;
  }

  /**
   * updatePost
   */
  public async updatePost(): Promise<void> {
    return;
  }

  /**
   * getPosts
   */
  public async getPosts(): Promise<Array<IPostModel>> {
    const posts = await PostModel.find({});
    return posts;
  }

  /**
   * getPost
   */
  public async getPost(postID: string): Promise<IPostModel> {
    const post = await PostModel.findOne({ _id: postID });
    return post;
  }
}
