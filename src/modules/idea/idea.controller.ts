//#region-imports

import { Response } from "express";
import { IReqUser } from "../../utils/interfaces";

import response from "../../utils/response";
import ideaService from "./idea.service";

//#endregion

export default {
  async findAll(_: IReqUser, res: Response): Promise<void> {
    try {
      const message: string = "Data Retrieved Successfully";
      const ideas = await ideaService.findAll();
      return response.success(res, ideas, message);
    } catch (error) {
      return response.error(res, error);
    }
  },

  async create(_: IReqUser, res: Response): Promise<void> {
    try {
      const message: string = "Data Retrieved Successfully";
      const ideas = await ideaService.findAll();
      return response.success(res, ideas, message);
    } catch (error) {
      return response.error(res, error);
    }
  },
};
