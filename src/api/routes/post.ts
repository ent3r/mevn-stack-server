import { Router, Request, Response } from "express";
import { celebrate, Joi } from "celebrate";

import PostService from "../../services/posts";

const postService = new PostService();

const postIDValidation = celebrate({
  params: Joi.object({ postID: Joi.string().length(24).required() }),
});

export default (router: Router): void => {
  router.post(
    "/posts",
    celebrate({
      body: Joi.object({
        title: Joi.string().min(5).max(120).required(),
        body: Joi.string().min(1).max(480).required(),
        author: Joi.string().min(2).max(50).optional().default("Anon"),
      }),
    }),
    (req: Request, res: Response): void => {
      postService
        .createNewPost({
          title: req.body.title,
          body: req.body.body,
          author: req.body.author,
        })
        .then((documentID: string) => res.status(201).send(documentID))
        .catch((rejectReason) => res.status(500).send(rejectReason));
    }
  );

  router.delete(
    "/posts/:postID",
    postIDValidation,
    (req: Request, res: Response): void => {
      postService
        .deletePost(req.params.postID)
        .then(() => res.status(204).end())
        .catch((rejectReason) => res.status(500).send(rejectReason).end());
    }
  );

  router.get("/posts", (req: Request, res: Response): void => {
    postService
      .getPosts()
      .then((posts) => res.status(200).send(posts))
      .catch((rejectReason) => res.status(500).send(rejectReason));
  });

  router.get(
    "/posts/:postID",
    postIDValidation,
    (req: Request, res: Response): void => {
      postService
        .getPost(req.params.postID)
        .then((post) => res.status(200).send(post))
        .catch((rejectReason) => res.status(500).send(rejectReason));
    }
  );
};
