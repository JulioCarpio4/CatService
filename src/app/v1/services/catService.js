// @ts-nocheck
import * as Cats from '../data/Cat.js'
import { v4 as uuidv4 } from 'uuid'

const getCats = (params) => {

    try {
        const cats = Cats.getAllCats(params)
        return cats    
    } catch (error) {
        throw error
    }
}

const getCat = (catId) => {
    try {
        const cat = Cats.getCat(catId)
        return cat;
    } catch (error) {
        throw error
    }
}

const addCat = (newCat) => {
    const catToInsert = {
        ...newCat,
        id: uuidv4(),
        createdAt: new Date().toLocaleString('en-US', { timeZone: 'UTC'}),
        updatedAt: new Date().toLocaleString('en-US', { timeZone: 'UTC'})
    };
    try {
        const addedCat = Cats.addNewCat(catToInsert)
        return addedCat
    } catch (error) {
        throw error
    }
    
}

const updateCat = (catId, cat) => {
    try {
        const updatedCat = Cats.updateCat(catId, cat)
        return updatedCat;
    } catch (error) {
        throw error
    }
}

const deleteCat = (catId) => {
    try {
        Cats.deleteCat(catId)
    } catch (error) {
        throw error
    }
}

export {
    getCats,
    getCat,
    addCat, 
    updateCat, 
    deleteCat
}

