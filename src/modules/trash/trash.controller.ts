//#region-imports

import { Response } from "express";
import { IReqUser } from "../../utils/interfaces";

import response from "../../utils/response";
import trashService from "./trash.service";
import { deleteTrashSchema } from "./validation/delete.schema";
import { TrashResource } from "./trash.types";
import { restoreTrashSchema } from "./validation/restore.schema";

//#endregion

export default {
  async findAll(_: IReqUser, res: Response): Promise<void> {
    try {
      const message: string = "Data Retrieved Successfully";
      const data: any[] = await trashService.findAll();
      return response.success(res, data, message);
    } catch (error) {
      return response.error(res, error);
    }
  },

  async restore(req: IReqUser, res: Response): Promise<void> {
    try {
      const { params, user } = req;

      if (!user) return response.unauthorized(res, "Unauthorized");

      const { id, resource } = await restoreTrashSchema.validate(params, {
        abortEarly: false,
        stripUnknown: true,
      });

      const message: string = "Data Restored Successfully";

      await trashService.restore(id, resource as TrashResource);
      return response.success(res, null, message);
    } catch (error) {
      return response.error(res, error);
    }
  },

  async destroy(req: IReqUser, res: Response): Promise<void> {
    try {
      const { params, user } = req;

      if (!user) return response.unauthorized(res, "Unauthorized");

      const { id, resource } = await deleteTrashSchema.validate(params, {
        abortEarly: false,
        stripUnknown: true,
      });

      const message: string = "Data Destroyed Successfully";
      await trashService.destroy(id, resource as TrashResource);
      return response.success(res, null, message);
    } catch (error) {
      return response.error(res, error);
    }
  },
};
