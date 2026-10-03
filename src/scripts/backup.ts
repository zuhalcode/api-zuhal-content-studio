import { backupService } from "../modules/backup";

async function main() {
  const result = await backupService.backupDatabase();

  console.log("Backup successful:");
  console.log(result);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
