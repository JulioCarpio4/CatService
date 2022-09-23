import express from 'express'
import { makeInvoker } from 'awilix-express'
import CatController from '../controllers/catController.js'

export default function() {
    

    const router = express.Router()
    const catController = makeInvoker(CatController)
    
    router.get('/',
        catController('getAllCats')
    )   
    
    router.get('/:catId', 
        catController('getCat')
    )
    
    router.post('/',  
        catController('createCat')
    )
    
    router.patch('/:catId', 
        catController('updateCat')
    )
    
    router.delete('/:catId', 
        catController('deleteCat')
    )

    return router
}