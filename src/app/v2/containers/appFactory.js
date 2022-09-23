import awilix from "awilix";
import CatController from "../controllers/catController.js";
import CatService from "../services/catService.js";
import CatRepository from "../data/CatRepository.js";
import DBConnection from "../data/utils.js";

const createAppContainer = async () => {
  const container = awilix.createContainer({
    injectionMode: awilix.InjectionMode.PROXY,
  });

  container.register({
    //catController: awilix.asClass(CatController),
    catService: awilix.asClass(CatService),
    catRepository: awilix.asClass(CatRepository),
   // validateInput: awilix.asFunction(validateInput),
    dbConnection: awilix.asClass(DBConnection)
  });

  return container
};

export {
    createAppContainer
}
