//#region-imports

import { Response } from "express";
import { IReqUser } from "../../utils/interfaces";

import response from "../../utils/response";

import capitalService from "./capital.service";
import { createCapitalSchema } from "./validation/create.schema";
import { deleteCapitalSchema } from "./validation/delete.schema";
import { updateCapitalSchema } from "./validation/update.schema";
import { CapitalResponseDTO } from "./dto/response.dto";

//#endregion

interface CapitalQuery {
  year?: string;
  month?: string;
}

export default {
  async findAll(req: IReqUser, res: Response): Promise<void> {
    try {
      const { year, month } = req.query as CapitalQuery;
      const message: string = "Data Retrieved Successfully";
      const capitals: CapitalResponseDTO[] = await capitalService.findAll(
        year,
        month,
      );

      return response.success(res, capitals, message);
    } catch (error) {
      return response.error(res, error);
    }
  },

  async create(req: IReqUser, res: Response): Promise<void> {
    try {
      const { body, user } = req;

      if (!user) return response.unauthorized(res, "Unauthorized");

      const userId = user.id;

      const dto = await createCapitalSchema.validate(body, {
        abortEarly: false,
        stripUnknown: true,
      });

      const message: string = "Product Created Successfully";
      const product = await capitalService.create(dto, userId);

      return response.success(res, product, message);
    } catch (error) {
      return response.error(res, error);
    }
  },

  async update(req: IReqUser, res: Response): Promise<void> {
    try {
      const { body, user, params } = req;

      if (!user) return response.unauthorized(res, "Unauthorized");

      const dto = await updateCapitalSchema.validate(body, {
        abortEarly: false,
        stripUnknown: true,
      });

      const id = params.id;
      const userId = user.id;
      const message: string = "Asset Transaction Updated Successfully";

      const asset = await capitalService.update(dto, userId, id);
      return response.success(res, asset, message);
    } catch (error) {
      return response.error(res, error);
    }
  },

  // Soft Delete
  async remove(req: IReqUser, res: Response): Promise<void> {
    try {
      const { params, user } = req;

      if (!user) return response.unauthorized(res, "Unauthorized");

      const { id } = await deleteCapitalSchema.validate(params, {
        abortEarly: false,
        stripUnknown: true,
      });

      const userId = user!.id;
      const message: string = "Capital Deleted Successfully";

      await capitalService.remove(id, userId);

      return response.success(res, null, message);
    } catch (error) {
      return response.error(res, error);
    }
  },
};
