import { Validator } from 'jsonschema';
import { catSchema } from '../schemas/catSchema.js'

export const validateInput = (body: object) => {
  const v = new Validator();
  v.addSchema(catSchema, '/Cat');
  return v.validate(body, catSchema);
};