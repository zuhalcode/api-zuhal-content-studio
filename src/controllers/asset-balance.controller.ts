//#region-imports
import response from "../utils/response";

import { Response } from "express";
import { IReqUser } from "../utils/interfaces";

import assetBalanceService from "../services/asset-balance.service";
import { AssetBalanceResponseDTO } from "../types/asset-balance.types";

//#endregion

export default {
  async findAll(_: IReqUser, res: Response): Promise<void> {
    try {
      const message: string = "Data Retrieved Successfully";
      const assetBalances: AssetBalanceResponseDTO[] =
        await assetBalanceService.findAll();
      return response.success(res, assetBalances, message);
    } catch (error) {
      return response.error(res, error);
    }
  },
};
