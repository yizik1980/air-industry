import { join } from "path";
import { readFile } from "fs/promises";
import { writeFileSync } from "fs";


const first_word_regex = /[^.]+/;
const dataDirectory = join(process.cwd(), "apps", "backend", "src", "assets");
const buildPath = (fileName: string) => join(dataDirectory, fileName);

export async function readJson(fileName = "items.json", encoding = "utf8") {
  const nameList = fileName.match(first_word_regex)[0];
  try {
    const path = buildPath(fileName);
    const fileContent = await readFile(path, { flag: "r", encoding: Buffer.isEncoding(encoding) ? encoding : "utf8" });
    return JSON.parse(fileContent.toString());
  } catch (err) {
    return { [nameList]: [] };
  }
}

async function rewriteData(fileName, data) {
  try {
    writeFileSync(buildPath(fileName), JSON.stringify(data, null, 2), {
      encoding: "utf8",
      flag: "w",
    });
  } catch (err) {
    console.error("Error writing file:", err);
  }
  return data;
}

export async function addItem(fileName = "items.json", payloadObject) {
  const nameList = fileName.match(first_word_regex)[0];
  const data = await readJson(fileName);
  if (!Array.isArray(data[nameList])) {
    data[nameList] = [];
  }
  data[nameList] = [...data[nameList], payloadObject];
  return await rewriteData(fileName, data);
}

export async function deleteItem(fileName = "items.json", id) {
  const nameList = fileName.match(first_word_regex)[0];
  const data = await readJson(fileName);
  if (!Array.isArray(data[nameList])) {
    data[nameList] = [];
  }
  data[nameList] = [...data[nameList].filter((item) => item.id !== id)];
  return await rewriteData(fileName, data);
}

export default {
  readJson,
  addItem,
  deleteItem,
};
