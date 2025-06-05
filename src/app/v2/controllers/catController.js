// @ts-nocheck
import { validateInput } from "../validators/schemaValidator.js";

export default class CatController {
  constructor(options) {
    this.catService = options.catService;
    
  }
  
  getAllCats(req, res) {
    const { colorType, favoriteMeal, page, size } = req.query;
    try {
      const cats = this.catService.getCats({ colorType, favoriteMeal, page, size });
      res.send({
        status: "OK",
        data: cats.cats,
        page: cats.page,
        size: cats.size,
      });
    } catch (error) {
      res
        .status(error?.status || 500)
        .send({ status: "FAILED", data: { error: error?.message || error } });
    }
  }

  getCat(req, res) {
    const {
      params: { catId },
    } = req;

    if (!catId) {
      res.status(400).send({
        status: "FAILED",
        data: {
          error: "Param :catId Cannot be empty",
        },
      });
    }

    try {
      const cat = this.catService.getCat(catId);
      res.send({ status: "OK", data: cat });
    } catch (error) {
      res.status(error?.status || 500).send({
        status: "FAILED",
        data: {
          error: error?.message || error,
        },
      });
    }
  }

  createCat(req, res) {
    const { body } = req;

    if (!validateInput(body)) {
      res.status(400).send({
        status: "FAILED",
        data: {
          error:
            "One of the following keys is missmig or is empty in request body: firstName, lastName, age, colorType",
        },
      });
      return;
    }

    try {
      const newCat = this.catService.addCat(body);
      res.status(201).send({ status: "OK", data: newCat });
    } catch (error) {
      res
        .status(error?.status || 500)
        .send({ status: "FAILED", data: { error: error?.message || error } });
    }
  }

  updateCat(req, res) {
    const {
      body,
      params: { catId },
    } = req;
    if (!catId) {
      res.status(400).send({
        status: "FAILED",
        data: { error: "Parameter ':catId' can not be empty" },
      });
    }

    try {
      const updatedCat = this.catService.updateCat(catId, body);
      res.send({ status: "OK", data: updatedCat });
    } catch (error) {
      res
        .status(error?.status || 500)
        .send({ status: "FAILED", data: { error: error?.message || error } });
    }
  }

  deleteCat(req, res) {
    const {
      params: { catId },
    } = req;

    if (!catId) {
      res.status(400).send({
        status: "FAILED",
        data: { error: "Parameter ':catId' can not be empty" },
      });
    }

    try {
      this.catService.deleteCat(catId);
      res.status(204).send({ status: "OK" });
    } catch (error) {
      res
        .status(error?.status || 500)
        .send({ status: "FAILED", data: { error: error?.message || error } });
    }
  }
}
