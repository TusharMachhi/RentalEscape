//import userService from "../services/user.service.js";

export const register = async (req, res, next) => {
  console.log(req.validated);
  res.json({ success: "working" });
};
