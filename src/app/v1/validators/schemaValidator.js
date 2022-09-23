import { Validator } from 'jsonschema';
import { catSchema } from '../schemas/catSchema.js'
var v = new Validator();

v.addSchema(catSchema, '/Cat')

const validateInput = (body) => {
    return v.validate(body, catSchema)
}

export {
    validateInput
}