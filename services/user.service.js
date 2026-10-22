import jwt from "jsonwebtoken";
import { userRepo } from "../repositories/user.repo.js";
import { ApiError } from "../utils/ErorrClassAPi.js";
import { genAccessAndRefreshToken } from "../utils/genRefAndAcessToken.js";
import { logger } from "../config/logger.js";
import { uploadToCloudinary } from "../utils/middleware/cloudinary.js";
import { ApiFeatures } from "../utils/middleware/ApiFeatures.js";

export const userServices = {
  register: async (data) => {
    const existingUser = await userRepo.findByEmail(data.email);
    console.log(existingUser);

    if (existingUser) {
      throw new ApiError(409, "user already exist");
    }

    const user = await userRepo.create(data);

    return user;
  },

  loginUser: async (data) => {
    console.log(data);
    const user = await userRepo.findByEmail(data.email, "+password");

    if (!user) {
      throw new ApiError(404, "user not found");
    }
    const checkPassword = await user.isCorrectPassword(data.password);

    if (!checkPassword) {
      throw new ApiError(401, "invalid email or password");
    }
    console.log(user._id);
    const { accessToken, refreshToken } = await genAccessAndRefreshToken(
      user._id,
      user.role,
    );

    return { accessToken, refreshToken, user };
  },

  logoutUser: async (data) => {
    const user = await userRepo.findById(data);
    if (!user) {
      throw new ApiError(404, "user not found");
    }
    const refreshTokenResponse = await userRepo.invalidateRefreshToken(data);

    return refreshTokenResponse;
  },

  renewedAccessToken: async (refreshToken) => {
    if (!refreshToken) {
      throw new ApiError(401, "refresh token expired");
    }

    const decoded = jwt.verify(refreshToken, process.env.REFRESHTOKEN_SECRET);

    const user = await userRepo.findById(decoded?.userId, "+refreshToken");

    if (!user) {
      throw new ApiError(404, "invalide refresh token");
    }

    logger.debug(user);
    if (refreshToken !== user?.refreshToken) {
      throw new ApiError(401, "invalid refresh token or used");
    }

    const tokens = await genAccessAndRefreshToken(user?._id, user?.role);

    return tokens;
  },
  getAllUser: async (data) => {
    const totalDocs = await userRepo.totalDocuments();
    const features = new ApiFeatures(userRepo.find(), data, totalDocs)
      .filter()
      .sort()
      .fields()
      .paginate();

    const users = await features.query;

    return { pagination: features.pagination, users };
    //   let queryObj = { ...data };
    //   console.log(queryObj);

    //   const excludedFields = ["page", "fields", "limit", "sort"];
    //   excludedFields.forEach((fields) => delete queryObj[fields]);

    //   let queryStr = JSON.stringify(queryObj);

    //   queryStr = queryStr.replace(
    //     /\b(gt|gte|ne|neq|lt|lte|regex|eq)\b/g,
    //     (match) => `$${match}`,
    //   );

    //   let query = userRepo.find(JSON.parse(queryStr));
    //   if (data.sort) {
    //     const sortBy = data.sort.split(",").join(" ");
    //     query = query.sort(sortBy);
    //   } else {
    //     query = query.sort("-createdAt");
    //   }

    //   if (data.fields) {
    //     const fields = data.fields.split(",").join(" ");

    //     query = query.select(fields);
    //   }

    //   const page = parseInt(data.page, 10) || 1;
    //   const limit = parseInt(data.limit, 10) || 10;
    //   const startIndex = (page - 1) * limit;
    //   const endIndex = page * limit;
    //   const total = await userRepo.totalDocuments();

    //   const pagination = {};
    //   if (startIndex > 0) {
    //     pagination.prev = {
    //       page: page - 1,
    //       limit,
    //     };
    //   }
    //   if (endIndex < total) {
    //     pagination.next = {
    //       page: page + 1,
    //       limit,
    //     };
    //   }
    //   const hasNextPage = endIndex < total;
    //   const hasPrevPage = startIndex > 0;
    //   ((pagination.hasNextPage = hasNextPage),
    //     (pagination.hasPrevPage = hasPrevPage));
    //   query = query.skip(startIndex).limit(limit);

    //   const result = await query;

    //   return { pagination, result };
  },

  getUser: async (data) => {
    const user = await userRepo.findById(data);
    if (!user) {
      throw new ApiError(404, "user not found");
    }
    return user;
  },
  uploadUserProfile: async (file, userId) => {
    if (!file) {
      throw new ApiError(404, "image file path not found");
    }
    const { public_id, secure_url, asset_id } = await uploadToCloudinary(file);

    const data = {
      profile: {
        publicId: public_id,
        secureUrl: secure_url,
        assetId: asset_id,
      },
    };

    await userRepo.updateById(userId, data);
  },

  deletUser: async (userId) => {
    if (!userId) {
      throw new ApiError(404, "user id is missing");
    }
    return await userRepo.updateById(userId, { active: false });
  },
};
