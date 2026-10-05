import { asynchandler } from "../utils/asynchandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { Comment } from "../models/comment.model.js";
import { Blog } from "../models/blog.model.js";

const getBlogComments = asynchandler(async (req, res) => {
  const { blogId } = req.params;

  const blog = await Blog.findById(blogId);
  if (!blog) {
    throw new ApiError(404, "Blog not found");
  }

  const comments = await Comment.find({ commentedOn: blogId })
    .populate("commentedBy", "username fullname avatar")
    .sort({ createdAt: -1 });

  return res
    .status(200)
    .json(new ApiResponse(200, comments, "Comments fetched successfully"));
});

const createComment = asynchandler(async (req, res) => {
  const { content } = req.body;
  const { blogId } = req.params;

  if (!content || !content.trim()) {
    throw new ApiError(400, "Comment content is required");
  }

  const blog = await Blog.findById(blogId);
  if (!blog) {
    throw new ApiError(404, "Blog not found");
  }

  const comment = await Comment.create({
    content: content.trim(),
    commentedBy: req.user._id,
    commentedOn: blogId,
  });

  const populatedComment = await Comment.findById(comment._id).populate(
    "commentedBy",
    "username fullname avatar"
  );

  return res
    .status(201)
    .json(new ApiResponse(201, populatedComment, "Comment added successfully"));
});

const deleteComment = asynchandler(async (req, res) => {
  const { commentId } = req.params;

  const comment = await Comment.findById(commentId);
  if (!comment) {
    throw new ApiError(404, "Comment not found");
  }

  if (comment.commentedBy.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "You are not authorized to delete this comment");
  }

  await Comment.findByIdAndDelete(commentId);

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Comment deleted successfully"));
});

const updateComment = asynchandler(async (req, res) => {
  const { content } = req.body;
  const { commentId } = req.params;

  if (!content || !content.trim()) {
    throw new ApiError(400, "Comment content is required");
  }

  const comment = await Comment.findById(commentId);
  if (!comment) {
    throw new ApiError(404, "Comment not found");
  }

  if (comment.commentedBy.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "You are not authorized to update this comment");
  }

  const updatedComment = await Comment.findByIdAndUpdate(
    commentId,
    {
      $set: { content: content.trim() },
    },
    { new: true }
  ).populate("commentedBy", "username fullname avatar");

  return res
    .status(200)
    .json(new ApiResponse(200, updatedComment, "Comment updated successfully"));
});

export { getBlogComments, createComment, deleteComment, updateComment };