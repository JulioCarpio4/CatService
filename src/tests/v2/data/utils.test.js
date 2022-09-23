import * as common from "../../../app/v2/data/utils";

describe("Common util functions tests", () => {
  describe("Database interaction", () => {
    test("Should retrieve the data from a json file", () => {
      const DB = common.getDatabase();
      expect(DB).toBeDefined();
    });

    test("Should save data into a file", () => {
      const result = common.saveToDatabase("", "data.json");
      expect(result).toBeTruthy();
    });
  });
});
