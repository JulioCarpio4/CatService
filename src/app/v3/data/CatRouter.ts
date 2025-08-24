import { getDatabase, saveToDatabase } from './utils.js';
import type { SearchParams, Cat, StoredCat } from '../shared/types.js';
import { ObjectId } from 'mongodb';
import { collections } from './DBService.js';
import MongoCat from './MongoCat.js';

export const getAll = async (params: SearchParams) => {
  try {
    // Optional params to filter cats based on colorType and favoriteMeal
    const { colorType, favoriteMeal } = params;
    const cats = (await collections.cats
      ?.find({
        ...(colorType && {
          colorType: { $eq: params.colorType?.toLowerCase() },
        }),
        ...(favoriteMeal && {
          favoriteMeals: {
            $elemMatch: { $eq: params.favoriteMeal?.toLowerCase() },
          },
        }),
      })
      .toArray()) satisfies MongoCat[] | undefined;

    return {
      cats: cats ?? [],
    };
  } catch (error) {
    throw { status: 500, message: error };
  }
};

export const get = async (catId: string) => {
  try {
    const cat = await collections.cats?.findOne({
      _id: new ObjectId(catId),
    });
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

export const add = async (newCat: Cat) => {
  try {
    const sameNameCat = (await collections.cats?.findOne({
      firstName: { $eq: newCat.firstName },
      lastName: { $eq: newCat.lastName },
    })) satisfies MongoCat | null | undefined;

    if (sameNameCat) {
      throw {
        status: 400,
        message: `Cat with name ${newCat.firstName} ${newCat.lastName} already exists`,
      };
    }

    const result = await collections.cats?.insertOne(newCat as MongoCat);
    return result;
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
    const indexForUpdate = DB.Cats.findIndex(
      (cat: StoredCat) => cat.id === catId,
    );
    if (indexForUpdate === -1) {
      throw {
        status: 400,
        message: `Can't find cat with id '${catId}'`,
      };
    }
    const updatedCat = {
      ...DB.Cats[indexForUpdate],
      ...cat,
      updatedAt: new Date().toLocaleString('en-US', { timeZone: 'UTC' }),
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
    const indexForDeletion = DB.Cats.findIndex(
      (cat: StoredCat) => cat.id === catId,
    );
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
