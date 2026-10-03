import { TrashHandler } from "../trash/trash.types";
import assetTransactionService from "./asset-transaction.service";

export const assetTransactionTrashHandler: TrashHandler = {
  restore: (id) => assetTransactionService.restore(id),
  destroy: (id) => assetTransactionService.destroy(id),
};
