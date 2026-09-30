import { baseRepo } from "./base.repo.js";
import Model from "../models/user.model.js";

export const userRepo = {
  ...baseRepo(Model),

  findByEmail: (email, select = "") => Model.findOne({ email }).select(select),

  invalidateRefreshToken: (userId) =>
    Model.findByIdAndUpdate(
      userId,
      { $unset: { refreshToken: 1 } },
      { returnDocument: "after" },
    ),
  
};
