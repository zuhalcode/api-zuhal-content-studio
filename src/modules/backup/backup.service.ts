import path from "node:path";
import { mkdir, rm, stat } from "node:fs/promises";
import { promisify } from "node:util";
import { execFile } from "node:child_process";
import { createHash } from "node:crypto";
import { createReadStream } from "node:fs";

import { SUPABASE_DATABASE_URL } from "../../libs/env";
import { BACKUP_DIR } from "./backup.constant";

export interface BackupResult {
  filename: string;
  filePath: string;
  size: number;
  checksum: string;
  createdAt: string;
}

const execFileAsync = promisify(execFile);

export default {
  async backupDatabase(): Promise<BackupResult> {
    const createdAt = new Date();

    const timestamp = createdAt
      .toISOString()
      .replace(/\.\d{3}Z$/, "Z")
      .replace(/:/g, "-");

    const filename = `database-${timestamp}.dump`;
    const dumpPath = path.join(BACKUP_DIR, filename);

    try {
      await mkdir(BACKUP_DIR, { recursive: true });

      console.log("Starting PostgreSQL backup...");
      console.log(`Output: ${dumpPath}`);

      await execFileAsync("pg_dump", [
        SUPABASE_DATABASE_URL,
        "--format=custom",
        "--no-owner",
        "--no-privileges",
        "--no-subscriptions",
        "--file",
        dumpPath,
      ]);

      console.log("PostgreSQL dump completed");

      const fileStats = await stat(dumpPath);

      if (!fileStats.size) {
        throw new Error("Generated backup file is empty");
      }

      console.log(`Backup size: ${fileStats.size} bytes`);

      const checksum = await this.calculateChecksum(dumpPath);

      return {
        filename,
        filePath: dumpPath,
        size: fileStats.size,
        checksum,
        createdAt: createdAt.toISOString(),
      };
    } catch (error) {
      console.error("Database backup failed:", error);

      await rm(dumpPath, {
        force: true,
      }).catch(() => undefined);

      throw error;
    }
  },

  async calculateChecksum(filePath: string): Promise<string> {
    const hash = createHash("sha256");
    const stream = createReadStream(filePath);

    return new Promise((resolve, reject) => {
      stream.on("data", (chunk) => {
        hash.update(chunk);
      });

      stream.on("end", () => {
        resolve(hash.digest("hex"));
      });

      stream.on("error", reject);
    });
  },
};
