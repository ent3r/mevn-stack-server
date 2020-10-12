import { v4 as uuidv4 } from "uuid";

import { IPostModel, PostModel } from "../models/Post";
import Logger from "../loaders/logger";
import { GetPostQueryParams, PostInput, PostUpdateInput } from "../types";

export default class PostService {
  /**
   * createNewPost
   * @returns {string} the ID of the new post
   */
  public async createNewPost(postDetails: PostInput): Promise<string | void> {
    const timeNow = new Date();
    const postUUID = uuidv4();
    return new PostModel({
      title: postDetails.title,
      body: postDetails.body,
      author: postDetails.author,
      publishedAt: timeNow,
      lastEditedAt: null,
      uuid: postUUID,
    })
      .save()
      .then((document: IPostModel) => document.uuid)
      .catch((err) => {
        Logger.warning(`Failed to create new post. Reason:\n${err}`);
        Promise.reject("Error while saving document");
      });
  }

  /**
   * deletePost
   */
  public async deletePost(postUUID: string): Promise<string | void> {
    const post = await PostModel.findOne({ uuid: postUUID });
    if (!post) {
      return;
    }
    return post.deleteOne().then((deletedPost) => deletedPost.uuid);
  }

  /**
   * updatePost
   */
  public async updatePost(
    postUUID: string,
    newContent: PostUpdateInput
  ): Promise<IPostModel | void> {
    newContent.lastEditedAt = new Date();
    const post = await PostModel.findOne({ uuid: postUUID });
    if (!post) {
      return;
    }
    return post.updateOne(newContent).then((idkStatusStuff) => idkStatusStuff);
  }

  /**
   * getPosts
   */
  public async getPosts(queryParams: GetPostQueryParams): Promise<Array<IPostModel>> {
    const posts = await PostModel.find({}).select("-_id").select("-__v");
    if (queryParams.reversed) {
      posts.reverse();
    }
    return posts;
  }

  /**
   * getPost
   */
  public async getPost(postUUID: string): Promise<IPostModel | void> {
    const post = await PostModel.findOne({ uuid: postUUID })
      .select("-_id")
      .select("-__v");
    if (!post) {
      return;
    }
    return post;
  }
}
