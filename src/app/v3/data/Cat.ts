import { getDatabase, saveToDatabase } from "./utils.js";
import type { SearchParams, Cat, StoredCat } from '../shared/types.js';

export const getAll = (params: SearchParams) => {
  try {
    let DB = getDatabase().Cats;
    const size = Number(params.size ?? 5)
    const page = (params.page ?? 1) - 1

    if (params.colorType) {
      DB = DB.filter((cat: Cat) =>
        cat.colorType.toLowerCase().includes(params.colorType!.toLowerCase()))
    }

    if (params.favoriteMeal) {
      DB = DB.filter((cat: Cat) =>
        cat.favoriteMeals.filter((meal: string) =>
          meal.toLowerCase() === params.favoriteMeal!.toLowerCase()
        ).length > 0
      )
    }

    const dataToBeReturned = DB.slice(page * size, (page * size) + size)

    return {
      cats: dataToBeReturned,
      page: page + 1,
      size: dataToBeReturned.length
    }

  } catch (error) {
    throw { status: 500, message: error };
  }
};

export const get = (catId: string) => {
  try {
    const DB = getDatabase();
    const cat = DB.Cats.find((cat: StoredCat) => cat.id === catId);
    if (!cat) {
      throw {
        status: 400,
        message: `Can't find a cat with the id '${catId}'`,
      };
    }
    return cat;
  } catch (error: any) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};

export const add = (newCat: Cat) => {
  try {
    const DB = getDatabase();
    const isAlreadyAdded =
      DB.Cats.findIndex(
        (cat: Cat) =>
          cat.firstName === newCat.firstName && cat.lastName === newCat.lastName
      ) > -1;

    if (isAlreadyAdded) {
      throw {
        status: 400,
        message: `Cat with name ${newCat.firstName} ${newCat.lastName} already exists`,
      };
    }
    DB.Cats.push(newCat);
    saveToDatabase(DB);
    return newCat;
  } catch (error: any) {
    throw {
      status: 500,
      message: error?.message || error,
    };
  }
};

export const update = (catId: string, cat: StoredCat) => {
  try {
    const DB = getDatabase();
    const indexForUpdate = DB.Cats.findIndex((cat: StoredCat) => cat.id === catId);
    if (indexForUpdate === -1) {
      throw {
        status: 400,
        message: `Can't find cat with id '${catId}'`,
      };
    }
    const updatedCat = {
      ...DB.Cats[indexForUpdate],
      ...cat,
      updatedAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
    };
    DB.Cats[indexForUpdate] = updatedCat;
    saveToDatabase(DB);
    return updatedCat;
  } catch (error: any) {
    throw {
      status: error?.status || 500,
      message: error?.message || error,
    };
  }
};

export const remove = (catId: string) => {
  try {
    const DB = getDatabase();
    const indexForDeletion = DB.Cats.findIndex((cat: StoredCat) => cat.id === catId);
    if (indexForDeletion === -1) {
      throw {
        status: 400,
        message: `Can't find cat with the id '${catId}'`,
      };
    }

    DB.Cats.splice(indexForDeletion, 1);
    saveToDatabase(DB);
  } catch (error: any) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};