import { baseRepo } from "./base.repo.js";
import Model from "../models/user.model.js";

export const userRepo = {
  ...baseRepo(Model),

  findByEmail: (email) => Model.findOne({ email }),
};
