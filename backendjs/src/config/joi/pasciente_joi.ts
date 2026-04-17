import Joi from 'joi';
import Pasciente from '../interface/pasciente_interface';

const pascienteJoi = Joi.object<Pasciente>({
  nome: Joi.string().min(5).max(25).required().messages({
    'string.base': 'o nome tem que ser um texto',
    'string.min': 'o nome tem que ter no minimo 5 caracteres.',
    'string.max': 'o nome tem que ter no máximo 25 caracteres.',
  }),
  dataNascimento: Joi.date().max('now').messages({
    'date.format': 'Formato de data inválido',
  }),
  carteirinha: Joi.string().length(6).messages({
    'string.base': 'o nome tem que ser um texto',
    'string.length': 'carteirinha deve ter exatamente 6 caracteres',
  }),
  cpf: Joi.string().length(11).messages({
    'string.base': 'o nome tem que ser um texto',
    'string.length': 'carteirinha deve ter exatamente 11 caracteres',
  }),
});

export default pascienteJoi;
