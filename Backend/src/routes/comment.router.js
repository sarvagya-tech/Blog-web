import { Router } from "express";
import { verifyJwt } from "../middleware/Auth.middleware.js";
import {
  createComment,
  deleteComment,
  getBlogComments,
  updateComment,
} from "../controllers/comment.controller.js";

const commentRouter = Router();

commentRouter.get("/:blogId", getBlogComments);
commentRouter.post("/:blogId", verifyJwt, createComment);
commentRouter.delete("/:commentId", verifyJwt, deleteComment);
commentRouter.patch("/:commentId", verifyJwt, updateComment);

export { commentRouter };