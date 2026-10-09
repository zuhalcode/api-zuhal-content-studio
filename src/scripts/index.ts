import { supabase } from "../libs/supabase";
import { ideaService } from "../modules/idea";
import { createIdeaSchema } from "../modules/idea/idea.schema";

const SEED_USER = {
  email: "zuhalcode@gmail.com",
  password: "zuhal123",
};

async function seedUser() {
  const { data: existingUsers, error: listError } =
    await supabase.auth.admin.listUsers();

  if (listError) throw listError;

  const existingUser = existingUsers.users.find(
    (user) => user.email === SEED_USER.email,
  );

  if (existingUser) {
    console.log(`[seed] user already exists: ${existingUser.email}`);
    return existingUser;
  }

  const { data, error } = await supabase.auth.admin.createUser({
    email: SEED_USER.email,
    password: SEED_USER.password,
    email_confirm: true,
  });

  if (error) throw error;

  console.log(`[seed] user created: ${data.user.email}`);

  return data.user;
}

async function seedIdeas() {
  const { data: projects, error } = await supabase
    .from("projects")
    .select("id, name")
    .limit(1);

  if (error) {
    throw error;
  }

  const project = projects?.[0];

  if (!project) {
    throw new Error("[seed] no project found");
  }

  const ideas = [
    {
      project_id: project.id,
      title: "Kenapa Supabase RLS sering menghasilkan 403?",
      problem:
        "Developer sering mengaktifkan RLS tetapi policy tidak sesuai dengan kondisi user.",
      angle: "Jelaskan debugging RLS dari symptom sampai policy.",
      core_idea:
        "Gunakan pendekatan bertahap untuk menemukan penyebab 403 pada Supabase RLS.",
      source: "experience",
      priority: 1,
      notes: "Potential debugging content.",
    },
    {
      project_id: project.id,
      title: "Access Token vs Refresh Token di Supabase",
      problem:
        "Pemula sering menganggap access token dan refresh token memiliki fungsi yang sama.",
      angle: "Jelaskan menggunakan analogi tiket akses.",
      core_idea:
        "Access token digunakan untuk akses sementara, sedangkan refresh token digunakan untuk mendapatkan access token baru.",
      source: "learning",
      priority: 2,
    },
    {
      project_id: project.id,
      title: "Kesalahan menyimpan JWT di localStorage",
      problem:
        "Banyak implementasi authentication menyimpan credential secara tidak tepat.",
      angle: "Bandingkan localStorage dengan cookie.",
      core_idea:
        "Pemilihan media penyimpanan token harus mempertimbangkan model ancaman aplikasi.",
      source: "research",
      priority: 2,
    },
  ];

  for (const item of ideas) {
    const parsed = createIdeaSchema.parse(item);
    const idea = await ideaService.create(parsed);

    console.log(`[seed] idea created: ${idea.title}`);
  }
}

async function main() {
  console.log("[seed] starting...");

  await seedUser();
  await seedIdeas();

  console.log("[seed] completed");
}

main().catch((error) => {
  console.error("[seed] failed:", error);
  process.exit(1);
});
