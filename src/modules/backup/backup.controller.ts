//#region-imports

import { Response } from "express";
import { IReqUser } from "../../utils/interfaces";
import response from "../../utils/response";
import backupService from "./backup.service";

//#endregion

export default {
  async backupDatabase(req: IReqUser, res: Response): Promise<void> {
    try {
      if (!req.user) return response.error(res, null);

      const backup = await backupService.backupDatabase();

      res.setHeader("Content-Type", "application/octet-stream");
      res.setHeader(
        "Content-Disposition",
        `attachment; filename="${backup.filename}"`,
      );

      return res.sendFile(backup.filePath, (error) => {
        if (error) {
          console.error("Failed to send backup file:", error);
        }
      });
    } catch (error) {
      console.error("Database backup failed:", error);
      return response.error(res, error);
    }
  },
};
