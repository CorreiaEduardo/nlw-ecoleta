/* eslint-disable no-useless-escape */
import { Joi } from 'celebrate';

const CreatePointSchema = {
  name: Joi.string().required().max(30),
  email: Joi.string().required().email(),
  whatsapp: Joi.number().required(),
  lat: Joi.number().required(),
  lng: Joi.number().required(),
  uf: Joi.string().required().max(2),
  city: Joi.string().required().max(30),
  // eslint-disable-next-line prettier/prettier
  items: Joi.string().required().pattern(new RegExp('^(([1-9](\,)?))+$')),
};

export default CreatePointSchema;
