import { Router } from "express";
import { verifyJwt } from "../middleware/Auth.middleware.js";
import { toggleLike, getBlogLikes } from "../controllers/like.controller.js";

const likeRouter = Router();

likeRouter.get("/:blogId", getBlogLikes);
likeRouter.post("/toggle/:blogId", verifyJwt, toggleLike);

export { likeRouter };
