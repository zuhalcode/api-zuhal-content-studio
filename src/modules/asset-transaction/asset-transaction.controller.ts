import { Response } from "express";

import assetTransactionService from "./asset-transaction.service";

import { createAssetTransactionSchema } from "./validation/create.schema";
import { updateAssetTransactionSchema } from "./validation/update.schema";
import { deleteAssetTransactionSchema } from "./validation/delete.schema";
import { AssetTransactionResponseDTO } from "./dto/asset-transaction.response.dto";
import { IReqUser } from "../../utils/interfaces";
import response from "../../utils/response";

export default {
  async findAll(_: IReqUser, res: Response): Promise<void> {
    try {
      const message: string = "Data Retrieved Successfully";
      const assets: AssetTransactionResponseDTO[] =
        await assetTransactionService.findAll();
      return response.success(res, assets, message);
    } catch (error) {
      return response.error(res, error);
    }
  },

  async create(req: IReqUser, res: Response): Promise<void> {
    try {
      const { body, user } = req;

      if (!user) return response.unauthorized(res, "Unauthorized");

      const dto = await createAssetTransactionSchema.validate(body, {
        abortEarly: false,
        stripUnknown: true,
      });

      const userId = user.id;
      const message: string = "Asset Transaction Created Successfully";

      const asset = await assetTransactionService.create(dto, userId);

      return response.success(res, asset, message);
    } catch (error) {
      return response.error(res, error);
    }
  },

  async update(req: IReqUser, res: Response): Promise<void> {
    try {
      const { body, user, params } = req;

      if (!user) return response.unauthorized(res, "Unauthorized");

      const dto = await updateAssetTransactionSchema.validate(body, {
        abortEarly: false,
        stripUnknown: true,
      });

      const id = params.id;
      const userId = user.id;
      const message: string = "Asset Transaction Updated Successfully";

      const asset = await assetTransactionService.update(dto, userId, id);
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

      const { id } = await deleteAssetTransactionSchema.validate(params, {
        abortEarly: false,
        stripUnknown: true,
      });

      const userId = user!.id;
      const message: string = "Asset Transaction Deleted Successfully";

      await assetTransactionService.remove(id, userId);

      return response.success(res, null, message);
    } catch (error) {
      return response.error(res, error);
    }
  },
};
