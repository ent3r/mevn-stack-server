export interface PostInput {
  title: string;
  body: string;
  author: string;
}

export interface PostUpdateInput {
  title?: string;
  body?: string;
  author?: string;
  lastEditedAt?: Date;
}

export interface GetPostQueryParams {
  reversed?: boolean;
}
