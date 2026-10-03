import { assetTransactionTrashHandler } from "../asset-transaction/asset-transaction.handler";
import { assetTrashHandler } from "../asset/asset.handler";
import { capitalTrashHandler } from "../capital/capital.handler";
import { productTrashHandler } from "../product/product.handler";
import { TrashHandler, TrashResource } from "./trash.types";

export const trashRegistry: Record<TrashResource, TrashHandler> = {
  capital: capitalTrashHandler,
  product: productTrashHandler,
  asset_transaction: assetTransactionTrashHandler,
  asset: assetTrashHandler,
};
