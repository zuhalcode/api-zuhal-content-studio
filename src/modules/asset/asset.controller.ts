//#region-imports

import { Response } from "express";
import { IReqUser } from "../../utils/interfaces";

import response from "../../utils/response";

import { AssetResponseDTO } from "./dto/asset-response.dto";
import assetService from "./asset.service";
import { deleteAssetSchema } from "./validation/delete.schema";

//#endregion

export default {
  async findAll(_: IReqUser, res: Response): Promise<void> {
    try {
      const message: string = "Data Retrieved Successfully";
      const assets: AssetResponseDTO[] = await assetService.findAll();
      return response.success(res, assets, message);
    } catch (error) {
      return response.error(res, error);
    }
  },

  async create(req: IReqUser, res: Response): Promise<void> {
    try {
      const { body, user } = req;

      if (!user) return response.unauthorized(res, "Unauthorized");

      const userId = user.id;
      const message: string = "Asset Created Successfully";

      const asset = await assetService.create(body, userId);
      return response.success(res, asset, message);
    } catch (error) {
      return response.error(res, error);
    }
  },

  async update(req: IReqUser, res: Response): Promise<void> {
    try {
      const { body, user, params } = req;

      if (!user) return response.unauthorized(res, "Unauthorized");

      const id = params.id;
      const userId = user.id;
      const message: string = "Asset Updated Successfully";

      const asset = await assetService.update(body, userId, id);
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

      const { id } = await deleteAssetSchema.validate(params, {
        abortEarly: false,
        stripUnknown: true,
      });

      const userId = user?.id;
      const message: string = "Asset Deleted Successfully";

      await assetService.remove(id, userId);
      return response.success(res, null, message);
    } catch (error) {
      return response.error(res, error);
    }
  },
};
