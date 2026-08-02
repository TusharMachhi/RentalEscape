import { userRepo } from "../repositories/user.repo.js";
import { ApiError } from "../utils/ErorrClassAPi.js";

export const userServices = {
  register: async (data) => {
    const existingUser = await userRepo.findByEmail(data);

    if (existingUser) {
      throw new ApiError(409, "user already exist");
    }

    const user = await userRepo.create(data);
    return user;
  },
};
