//#region-imports

import { Response } from "express";
import { IReqUser } from "../../utils/interfaces";

import response from "../../utils/response";

import projectService from "./project.service";

//#endregion

export default {
  async findAll(_: IReqUser, res: Response): Promise<void> {
    try {
      const message: string = "Data Retrieved Successfully";
      const projects = await projectService.findAll();
      return response.success(res, projects, message);
    } catch (error) {
      return response.error(res, error);
    }
  },
};
