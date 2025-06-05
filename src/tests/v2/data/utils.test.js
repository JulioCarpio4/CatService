
import DBConnection from "../../../app/v2/data/utils.js";

describe("Common util functions tests", () => {
  describe("Database interaction", () => {
    test("Should retrieve the data from a json file", () => {
      const DB = new DBConnection();
      DB.getDatabase();
      expect(DB).toBeDefined();
    });

    test("Should save data into a file", () => {
      const result = new DBConnection().saveToDatabase("", "data.json");
      expect(result).toBeTruthy();
    });
  });
});
