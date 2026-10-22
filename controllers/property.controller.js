import { propertyService } from "../services/property.service.js";
import { ResponseApi } from "../utils/ResponseApi.js";
export const createProperty = async (req, res) => {
  const data = req?.validated?.body;
  const userId = req?.user;
  const files = req?.files;
  const propertyData = {
    data,
    userId,
    files,
  };

  await propertyService.createProperty(propertyData);

  res.status(201).json(new ResponseApi(201, "property created successfully"));
};
