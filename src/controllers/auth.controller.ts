import { Response } from "express";
import { IReqUser } from "../utils/interfaces";
import response from "../utils/response";

export default {
  async me(req: IReqUser, res: Response) {
    try {
      const user = req.user;
      if (!user) {
        return response.error(res, null);
      }

      return response.success(res, user, "User data fetched successfully");
    } catch (error) {
      return response.error(res, error);
    }
  },
};
