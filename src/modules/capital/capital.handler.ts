import { TrashHandler } from "../trash/trash.types";
import capitalService from "./capital.service";

export const capitalTrashHandler: TrashHandler = {
  restore: (id) => capitalService.restore(id),
  destroy: (id) => capitalService.destroy(id),
};
