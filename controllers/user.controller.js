import { userServices } from "../services/user.service.js";
import { ResponseApi } from "../utils/ResponseApi.js";

export const register = async (req, res) => {
  const data = req.validated.body;
  console.log(data);

  const user = await userServices.register(data);

  return res
    .status(201)
    .json(new ResponseApi(201, "user created successfuly", user));
};
