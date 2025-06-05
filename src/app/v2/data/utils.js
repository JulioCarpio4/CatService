// @ts-nocheck
import fs from "fs";

export default class DBConnection {
  constructor() {}

  saveToDatabase = (DB, path = "./src/app/v2/data/db.json") => {
    fs.writeFileSync(path, JSON.stringify(DB, null, 2), {
      encoding: "utf-8",
    });

    return true;
  };

  getDatabase = (path = "./src/app/v2/data/db.json") => {
    const DB = JSON.parse(fs.readFileSync(path).toString());
    return DB;
  };
}
