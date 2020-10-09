import { Router, Request, Response, NextFunction } from "express";
import { celebrate, Joi } from "celebrate";

import PostService from "../../services/posts";

const postService = new PostService();

const postUUIDValidation = celebrate({
  params: Joi.object({ postID: Joi.string().length(36).required() }),
});

export default (router: Router): void => {
  router
    .route("/posts")
    .get(
      async (req: Request, res: Response): Promise<Response<any>> => {
        return postService
          .getPosts()
          .then((posts) => res.status(200).send(posts));
      }
    )
    .post(
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
    )
    .all((req: Request, res: Response, next: NextFunction): void => {
      const err = new Error("Method Not Allowed");
      err["status"] = 405;
      next(err);
    });

  router
    .route("/posts/:postID")
    .all(postUUIDValidation)
    .get(
      async (req: Request, res: Response): Promise<Response<any>> => {
        return postService
          .getPost(req.params.postID)
          .then((post) => res.status(200).send(post));
      }
    )
    .patch(
      celebrate(
        {
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
          .then((newDoc) => res.status(200).send(newDoc.uuid));
      }
    )
    .delete(
      async (req: Request, res: Response): Promise<Response<any>> => {
        return postService
          .deletePost(req.params.postID)
          .then(() => res.status(204).send());
      }
    )
    .all((req: Request, res: Response, next: NextFunction): void => {
      const err = new Error("Method Not Allowed");
      err["status"] = 405;
      next(err);
    });
};
