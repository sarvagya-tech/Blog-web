import { User } from "../models/user.model.js";
import { ApiError } from "../utils/apiError.js";
import { asynchandler } from "../utils/asynchandler.js";
import jwt from "jsonwebtoken";

const verifyJwt = asynchandler(async (req, res, next) => {
  const token =
    req.cookies?.accessToken ||
    req.header("Authorization")?.replace(/^Bearer\s+/i, "").trim();

  if (!token) {
    throw new ApiError(401, "Unauthorized: Please log in to continue");
  }

  try {
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const user = await User.findById(decodedToken?._id).select(
      "-password -refreshToken"
    );

    if (!user) {
      throw new ApiError(401, "Unauthorized: User not found");
    }

    req.user = user;
    next();
  } catch (error) {
    throw new ApiError(
      401,
      error?.message || "Unauthorized: Invalid or expired token"
    );
  }
});

export { verifyJwt };