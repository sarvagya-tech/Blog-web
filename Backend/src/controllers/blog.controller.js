import { ApiError } from "../utils/apiError.js";
import { asynchandler } from "../utils/asynchandler.js";
import { UploadOnCloudinary } from "../utils/cloudinary.js";
import { Blog } from "../models/blog.model.js";
import { ApiResponse } from "../utils/apiResponse.js";

const createBlog = asynchandler(async (req, res) => {
  const { title, content, category, excerpt } = req.body;

  if (!title || !title.trim()) {
    throw new ApiError(400, "Blog title is required");
  }
  if (!content || !content.trim()) {
    throw new ApiError(400, "Blog content is required");
  }

  const mediaLocalpath = req.files?.media?.[0]?.path;
  let mediaUrl = "";

  if (mediaLocalpath) {
    const media = await UploadOnCloudinary(mediaLocalpath);
    if (media?.secure_url || media?.url) {
      mediaUrl = media.secure_url || media.url;
    }
  }

  const author = req.user?._id;
  if (!author) {
    throw new ApiError(401, "Unauthorized: User not found");
  }

  const blog = await Blog.create({
    title: title.trim(),
    content: content.trim(),
    category: category ? category.trim() : "",
    excerpt: excerpt ? excerpt.trim() : "",
    media: mediaUrl,
    author,
  });

  const createdBlog = await Blog.findById(blog._id).populate(
    "author",
    "username fullname avatar"
  );

  return res
    .status(201)
    .json(new ApiResponse(201, createdBlog, "Blog created successfully"));
});

const getallBlog = asynchandler(async (req, res) => {
  const blogs = await Blog.find()
    .populate("author", "username fullname avatar")
    .sort({ createdAt: -1 });

  return res
    .status(200)
    .json(new ApiResponse(200, blogs, "All blogs fetched successfully"));
});

const getsingleBlog = asynchandler(async (req, res) => {
  const singleblog = await Blog.findById(req.params.id).populate(
    "author",
    "username fullname avatar"
  );

  if (!singleblog) {
    throw new ApiError(404, "Blog not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, singleblog, "Blog fetched successfully"));
});

const updateBlog = asynchandler(async (req, res) => {
  const { title, content, category, excerpt } = req.body;

  if (!title && !content && !category && !excerpt) {
    throw new ApiError(400, "At least one field is required to update");
  }

  const updateFields = {};
  if (title) updateFields.title = title.trim();
  if (content) updateFields.content = content.trim();
  if (category !== undefined) updateFields.category = category.trim();
  if (excerpt !== undefined) updateFields.excerpt = excerpt.trim();

  const blog = await Blog.findById(req.params.id);
  if (!blog) {
    throw new ApiError(404, "Blog not found");
  }

  if (blog.author.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "You are not authorized to update this blog");
  }

  const updatedBlog = await Blog.findByIdAndUpdate(
    req.params.id,
    { $set: updateFields },
    { new: true }
  ).populate("author", "username fullname avatar");

  return res
    .status(200)
    .json(new ApiResponse(200, updatedBlog, "Blog updated successfully"));
});

const deleteBlog = asynchandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);

  if (!blog) {
    throw new ApiError(404, "Blog not found");
  }

  if (blog.author.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "You are not authorized to delete this blog");
  }

  await Blog.findByIdAndDelete(req.params.id);

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Blog deleted successfully"));
});

export { createBlog, getallBlog, getsingleBlog, deleteBlog, updateBlog };