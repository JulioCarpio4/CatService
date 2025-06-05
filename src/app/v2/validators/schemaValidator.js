// @ts-nocheck
import { Validator } from 'jsonschema';
import { catSchema } from './catSchema.js'

const validateInput = (body) => {
    const v = new Validator();
    v.addSchema(catSchema, '/Cat')
    return v.validate(body, catSchema)
}

export {
    validateInput
}