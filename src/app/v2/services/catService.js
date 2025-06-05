// @ts-nocheck
import { v4 as uuidv4 } from "uuid";

export default class CatService {

  constructor(options) {
    this.catRepository = options.catRepository
  }

  getCats(params) {
    try {
      const cats = this.catRepository.getAllCats(params);
      return cats;
    } catch (error) {
      throw error;
    }
  }

  getCat(catId) {
    try {
      const cat = this.catRepository.getCat(catId);
      return cat;
    } catch (error) {
      throw error;
    }
  }

  addCat(newCat) {
    const catToInsert = {
      ...newCat,
      id: uuidv4(),
      createdAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
      updatedAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
    };
    try {
      const addedCat = this.catRepository.addNewCat(catToInsert);
      return addedCat;
    } catch (error) {
      throw error;
    }
  }

  updateCat(catId, cat) {
    try {
      const updatedCat = this.catRepository.updateCat(catId, cat);
      return updatedCat;
    } catch (error) {
      throw error;
    }
  }

  deleteCat(catId) {
    try {
        this.catRepository.deleteCat(catId);
    } catch (error) {
      throw error;
    }
  }
}
