import fs from "fs";
import path from "path";

const cacheDir = path.join(process.cwd(), "ai/cache");

export function saveCache(filename, data) {
  const filePath = path.join(cacheDir, filename);

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

export function loadCache(filename) {
  const filePath = path.join(cacheDir, filename);

  if (fs.existsSync(filePath)) {
    const data = fs.readFileSync(filePath);
    return JSON.parse(data);
  }

  return null;
}
