import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataDir = path.join(__dirname, "../data");
const notesDir = path.join(dataDir, "notes");

if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}
if (!fs.existsSync(notesDir)) {
  fs.mkdirSync(notesDir, { recursive: true });
}

export const profilePath = path.join(dataDir, "profile.json");
export const privateNotesFile = path.join(dataDir, "private.json");

export const getNoteFilePath = (topic) => {
  return path.join(notesDir, `${topic}.json`);
};

if (!fs.existsSync(privateNotesFile)) {
  fs.writeFileSync(privateNotesFile, "[]", "utf8");
}

if (!fs.existsSync(profilePath)) {
  const defaultProfile = {
    displayName: "User",
    theme: "dark",
    password: "123456",
  };
  fs.writeFileSync(
    profilePath,
    JSON.stringify(defaultProfile, null, 2),
    "utf8",
  );
}
