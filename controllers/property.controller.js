import { logger } from "../config/logger.js";
import { propertyService } from "../services/property.service.js";
import { ResponseApi } from "../utils/ResponseApi.js";
export const createProperty = async (req, res) => {
  logger.info("start property controller");
  const data = req?.validated?.body;
  const userId = req?.user;
  console.log(data);
  logger.info(data, userId);

  // await propertyService.createProperty({ userId, data });

  res.status(201).json(new ResponseApi(201, "property created successfully"));
};
