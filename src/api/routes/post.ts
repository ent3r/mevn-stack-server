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
    async (req: Request, res: Response): Promise<Response<any>> => {
      return postService
        .createNewPost({
          title: req.body.title,
          body: req.body.body,
          author: req.body.author,
        })
        .then((documentID: string) => res.status(201).send(documentID));
    }
  );

  router.patch(
    "/posts/:postID",
    celebrate(
      {
        params: Joi.object({ postID: Joi.string().length(24).required() }),
        body: Joi.object({
          title: Joi.string().min(5).max(120),
          body: Joi.string().min(1).max(480),
          author: Joi.string().min(2).max(50),
        }).min(1),
      },
      { messages: { "object.min": "body must have at least {#limit} key" } }
    ),
    async (req: Request, res: Response): Promise<Response<any>> => {
      return postService
        .updatePost(req.params.postID, req.body)
        .then((newDoc) => res.status(200).send(newDoc._id));
    }
  );

  router.delete(
    "/posts/:postID",
    postIDValidation,
    async (req: Request, res: Response): Promise<Response<any>> => {
      return postService
        .deletePost(req.params.postID)
        .then(() => res.status(204).send());
    }
  );

  router.get(
    "/posts",
    async (req: Request, res: Response): Promise<Response<any>> => {
      return postService
        .getPosts()
        .then((posts) => res.status(200).send(posts));
    }
  );

  router.get(
    "/posts/:postID",
    postIDValidation,
    async (req: Request, res: Response): Promise<Response<any>> => {
      return postService
        .getPost(req.params.postID)
        .then((post) => res.status(200).send(post));
    }
  );
};
