import { TrashHandler } from "../trash/trash.types";
import assetService from "./asset.service";

export const assetTrashHandler: TrashHandler = {
  restore: (id) => assetService.restore(id),
  destroy: (id) => assetService.destroy(id),
};
