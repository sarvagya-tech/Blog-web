import { Like } from "../models/like.model.js";
import { Blog } from "../models/blog.model.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asynchandler } from "../utils/asynchandler.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

const toggleLike = asynchandler(async (req, res) => {
  const { blogId } = req.params;

  const blog = await Blog.findById(blogId);
  if (!blog) {
    throw new ApiError(404, "Blog not found");
  }

  const existingLike = await Like.findOne({
    likedBy: req.user._id,
    likedOn: blogId,
  });

  let isLiked = false;

  if (existingLike) {
    await Like.findByIdAndDelete(existingLike._id);
    isLiked = false;
  } else {
    await Like.create({
      likedBy: req.user._id,
      likedOn: blogId,
    });
    isLiked = true;
  }

  const likesCount = await Like.countDocuments({ likedOn: blogId });

  return res.status(200).json(
    new ApiResponse(
      200,
      { isLiked, likesCount },
      isLiked ? "Blog liked" : "Blog unliked"
    )
  );
});

const getBlogLikes = asynchandler(async (req, res) => {
  const { blogId } = req.params;

  const likesCount = await Like.countDocuments({ likedOn: blogId });

  let isLiked = false;

  // Check if token exists in header or cookies to determine if current user liked it
  const token =
    req.cookies?.accessToken ||
    req.header("Authorization")?.replace(/^Bearer\s+/i, "").trim();

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      if (decoded?._id) {
        const existing = await Like.findOne({
          likedBy: decoded._id,
          likedOn: blogId,
        });
        isLiked = Boolean(existing);
      }
    } catch (e) {
      // Unauthenticated, isLiked stays false
    }
  }

  return res.status(200).json(
    new ApiResponse(
      200,
      { likesCount, isLiked },
      "Blog likes fetched successfully"
    )
  );
});

export { toggleLike, getBlogLikes };