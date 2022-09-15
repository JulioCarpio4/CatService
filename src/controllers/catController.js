import * as catService from '../services/catService.js'
import { validateInput } from '../v1/validators/schemaValidator.js'

const getAllCats = (req, res) => {
    const { colorType } = req.query
    try {
        const cats = catService.getCats({ colorType })
        res.send({ status: 'OK', data: cats })
    } catch (error) {
        res.status(error?.status || 500)
        .send({ status: 'FAILED', data: { error: error?.message || error }})
    }
}

const getCat = (req, res) => {
    const {
        params: { catId },
    } = req

    if (!catId) {
        res
        .status(400)
        .send({
            status: 'FAILED',
            data: {
                error: 'Param :catId Cannot be empty'
            }})
    }

    try {
        const cat = catService.getCat(catId)
        res.send({ status: 'OK', data: cat})
    } catch (error) {
        res
        .status(error?.status || 500)
        .send({ status: 'FAILED', data: {
            error: error?.message || error
        }})
    }
    
}

const createCat = (req, res) => {
    const { body } = req

    if (!validateInput(body)) {
        res.status(400).send({ status: 'FAILED', data: { 
            error: "One of the following keys is missmig or is empty in request body: firstName, lastName, age, colorType"
        }})
        return
    }

    try {
        const newCat = catService.addCat(body)
        res.status(201).send({ status: 'OK', data: newCat })
    } catch (error) {
        res
        .status(error?.status || 500)
        .send({ status: 'FAILED', data: { error: error?.message || error } })
    }
    
}

const updateCat = (req, res) => {
    const {
        body,
        params: {
            catId
        }
    } = req
    if (!catId) {
        res
        .status(400)
        .send({
            status: "FAILED",
            data: { error: "Parameter ':catId' can not be empty" },
        })
    }

    try {
        const updatedCat = catService.updateCat(catId, body)
        res.send({ status: 'OK', data: updatedCat})
    } catch (error) {
        res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
    }
    
}

const deleteCat = (req, res) => {

    const {
        params: { catId }
    } = req
    
    if (!catId) {
        res
        .status(400)
        .send({
            status: "FAILED",
            data: { error: "Parameter ':catId' can not be empty" },
        })
    }

    try {
        catService.deleteCat(catId)
        res.status(204).send({status: 'OK'})
    } catch (error) {
        res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
    }
    
}

export {
    getAllCats,
    getCat,
    createCat,
    updateCat,
    deleteCat
}