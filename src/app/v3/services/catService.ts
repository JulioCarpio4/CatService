import * as Cats from "../data/Cat.js";
import { v4 as uuidv4 } from "uuid";
import type { Cat, StoredCat } from "../shared/types.js";
import type { ParsedQs } from "qs";

export const getCats = (params: ParsedQs) => Cats.getAll(params);

export const getCat = (catId: string) => Cats.get(catId);

export const addCat = (newCat: Cat) => {
  const catToInsert = {
    ...newCat,
    id: uuidv4(),
    createdAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
    updatedAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
  };
  const addedCat = Cats.add(catToInsert);
  return addedCat;
};

export const updateCat = (catId: string, cat: StoredCat) =>
  Cats.update(catId, cat);

export const deleteCat = (catId: string) => Cats.remove(catId);
