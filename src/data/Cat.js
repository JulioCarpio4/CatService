import { getDatabase, saveToDatabase } from "./utils.js";

const getAllCats = (params) => {
  try {
    let DB = getDatabase();

    if (params.colorType) {
        return DB.Cats.filter(cat =>
            cat.colorType.toLowerCase().includes(params.colorType.toLowerCase()))
    }

  } catch (error) {
    throw { status: 500, message: error };
  }
};

const getCat = (catId) => {
  try {
    const DB = getDatabase();
    const cat = DB.Cats.find((cat) => cat.id === catId);
    if (!cat) {
      throw {
        status: 400,
        message: `Can't find a cat with the id '${catId}'`,
      };
    }
    return cat;
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};

const addNewCat = (newCat) => {
  try {
    const DB = getDatabase();
    const isAlreadyAdded =
      DB.Cats.findIndex(
        (cat) =>
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
  } catch (error) {
    throw {
      status: 500,
      message: error?.message || error,
    };
  }
};

const updateCat = (catId, cat) => {
  try {
    const DB = getDatabase();
    const indexForUpdate = DB.Cats.findIndex((cat) => cat.id === catId);
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
  } catch (error) {
    throw {
      status: error?.status || 500,
      message: error?.message || error,
    };
  }
};

const deleteCat = (catId) => {
  try {
    const DB = getDatabase();
    const indexForDeletion = DB.Cats.findIndex((cat) => cat.id === catId);
    if (indexForDeletion === -1) {
      throw {
        status: 400,
        message: `Can't find cat with the id '${catId}'`,
      };
    }
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }

  DB.Cats.splice(indexForDeletion, 1);
  saveToDatabase(DB);
};

export { getAllCats, getCat, addNewCat, updateCat, deleteCat };
