import { IPostModel } from "../models/Post";

/**
 * Sorts an array of posts by their publising date
 *
 * @param {Array<IPostModel>} posts the array of posts
 * @returns {Array<IPostModel>} the sorted array
 */
const sortByPublishedAt = (posts: Array<IPostModel>): Array<IPostModel> => {
  return posts.sort((a, b) => {
    // Turn your strings into dates, and then subtract them
    // to get a value that is either negative, positive, or zero.
    //? see https://stackoverflow.com/a/10124053/9088682
    return b.publishedAt.getTime() - a.publishedAt.getTime();
  });
};

export { sortByPublishedAt };
