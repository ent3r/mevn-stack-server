import { IPostModel } from "../models/Post";

const postPagination = (
  posts: Array<IPostModel>,
  limit: number
): Array<Array<IPostModel>> => {
  if (posts.length < limit) return [posts];
  const newArray: Array<Array<IPostModel>> = [];
  while (posts.length > limit) {
    newArray.push(posts.splice(0, limit));
  }
  return newArray;
};

export default postPagination;
