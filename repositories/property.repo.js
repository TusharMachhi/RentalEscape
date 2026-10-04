import { baseRepo } from "./base.repo.js";
import PropertyModel from "../models/property.model.js";

export const propertyRepo = {
  ...baseRepo(PropertyModel),
};
