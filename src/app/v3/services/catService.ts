import * as Cats from '../data/Cat.js';
import { v4 as uuidv4 } from 'uuid';
import type { Cat, StoredCat } from '../shared/types.js';
import type { ParsedQs } from 'qs';

export const getCats = (params: ParsedQs) => {

    try {
        const cats = Cats.getAll(params)
        return cats    
    } catch (error) {
        throw error
    }
}

export const getCat = (catId: string) => {
    try {
        const cat = Cats.get(catId)
        return cat;
    } catch (error) {
        throw error
    }
}

export const addCat = (newCat: Cat) => {
    const catToInsert = {
        ...newCat,
        id: uuidv4(),
        createdAt: new Date().toLocaleString('en-US', { timeZone: 'UTC'}),
        updatedAt: new Date().toLocaleString('en-US', { timeZone: 'UTC'})
    };
    try {
        const addedCat = Cats.add(catToInsert);
        return addedCat;
    } catch (error) {
        throw error;
    }
    
}

export const updateCat = (catId: string, cat: StoredCat) => {
    try {
        const updatedCat = Cats.update(catId, cat);
        return updatedCat;
    } catch (error) {
        throw error;
    }
}

export const deleteCat = (catId: string) => {
    try {
        Cats.remove(catId);
    } catch (error) {
        throw error;
    }
};
