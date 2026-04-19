import Joi from 'joi';
import Paciente from '../interface/paciente_interface';

const pacienteJoi = Joi.object<Paciente>({
  nome: Joi.string().min(5).max(25).required().messages({
    'string.base': 'O nome tem que ser um texto.',
    'string.min': 'O nome tem que ter no minimo 5 caracteres.',
    'string.max': 'O nome tem que ter no máximo 25 caracteres.',
  }),
  dataNascimento: Joi.date().max('now').messages({
    'date.format': 'Formato de data inválido.',
  }),
  carteirinha: Joi.string().length(6).messages({
    'string.base': 'A CArteirinha  tem que ser um texto.',
    'string.length': 'Carteirinha deve ter exatamente 6 caracteres.',
  }),
  cpf: Joi.string().length(11).messages({
    'string.base': 'O CPF tem que ser um texto.',
    'string.length': 'CPF deve ter exatamente 11 caracteres.',
  }),
});

export default pacienteJoi;
