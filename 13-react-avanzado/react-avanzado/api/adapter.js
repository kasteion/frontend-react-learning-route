import { Low, Memory } from "lowdb";
// import { dirname, join } from "path";
// import { fileURLToPath } from "url";
import json from "./db.js";

// const __dirname = dirname(fileURLToPath(import.meta.url));
// const json = join(__dirname, "db.json");
const isLocal = !process.env.VERCEL_REGION;
//const type = isLocal ? new JSONFile("./db.json") : new Memory();
const type = new Memory();

const db = new Low(type);
db.data = json;
db.write();
export default db;
