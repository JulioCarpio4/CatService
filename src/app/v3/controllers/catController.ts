import * as catService from '../services/catService.js'
import { validateInput } from '../validators/schemaValidator.js'
import type { Request, Response } from 'express';
import { buildErrorResponse } from '../shared/errors.js';

export const getAllCats = (req: Request, res: Response) => {
  const {
    colorType,
    favoriteMeal,
    page,
    size } = req.query
  try {
    const cats = catService.getCats({ colorType, favoriteMeal, page, size })
    res.send({ status: 'OK', data: cats.cats, page: cats.page, size: cats.size })
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status((error as any).status || 500)
        .send({ status: 'FAILED', data: { error: error.message } })
    } else {
      res.status(500)
        .send({ status: 'FAILED', data: { error: String(error) } })
    }
  }
};

export const getCat = (req: Request, res: Response) => {
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
        }
      })
  }

  try {
    const cat = catService.getCat(catId)
    res.send({ status: 'OK', data: cat })
  } catch (error) {
    const errorResponse = buildErrorResponse(error);
    res
      .status(errorResponse.status)
      .send(errorResponse.body);
  }

};

export const createCat = (req: Request, res: Response) => {
  const { body } = req

  if (!validateInput(body)) {
    res.status(400).send({
      status: 'FAILED', data: {
        error: "One of the following keys is missmig or is empty in request body: firstName, lastName, age, colorType"
      }
    })
    return
  }

  try {
    const newCat = catService.addCat(body)
    res.status(201).send({ status: 'OK', data: newCat })
  } catch (error) {
    const errorResponse = buildErrorResponse(error);
    res
      .status(errorResponse.status)
      .send(errorResponse.body);
  }

};

export const updateCat = (req: Request, res: Response) => {
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
    res.send({ status: 'OK', data: updatedCat })
  } catch (error) {
    const errorResponse = buildErrorResponse(error);
    res
      .status(errorResponse.status)
      .send(errorResponse.body);
  }

};

export const deleteCat = (req: Request, res: Response) => {
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
    res
      .status(204)
      .send({ status: 'OK' });
  } catch (error) {
    const errorResponse = buildErrorResponse(error);
    res
      .status(errorResponse.status)
      .send(errorResponse.body);
  }

};