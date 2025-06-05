import express from 'express'
import * as catController from '../controllers/catController.js'

export const catRoutes = () => {
  const router = express.Router();
  router.get('/',
      catController.getAllCats
  )   
  
  router.get('/:catId', 
      catController.getCat
  )
  
  router.post('/',  
      catController.createCat
  )
  
  router.patch('/:catId', 
      catController.updateCat
  )
  
  router.delete('/:catId', 
      catController.deleteCat
  )

  return router;
};