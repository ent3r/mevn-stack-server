import { Router, Request, Response } from "express";
import PostService from "../../services/posts";

const postService = new PostService();

export default (router: Router): void => {
  router.post("/posts", (req: Request, res: Response): void => {
    postService
      .createNewPost({
        title: req.body.title,
        body: req.body.body,
        author: req.body.author,
      })
      .then((documentID: string) => res.status(201).send(documentID))
      .catch((rejectReason) => res.status(500).send(rejectReason));
  });

  router.delete("/posts/:postID", (req: Request, res: Response): void => {
    postService
      .deletePost(req.params.postID)
      .then(() => res.status(204).end())
      .catch((rejectReason) => res.status(500).send(rejectReason).end());
  });

  router.get("/posts", (req: Request, res: Response): void => {
    postService
      .getPosts()
      .then((posts) => res.status(200).send(posts))
      .catch((rejectReason) => res.status(500).send(rejectReason));
  });

  router.get("/posts/:postID", (req: Request, res: Response): void => {
    postService
      .getPost(req.params.postID)
      .then((post) => res.status(200).send(post))
      .catch((rejectReason) => res.status(500).send(rejectReason));
  });
};
