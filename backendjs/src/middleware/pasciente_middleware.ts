import { Request, Response, NextFunction } from 'express';
import pacienteJoi from '../config/joi/paciente_joi';

export const pacienteValidate = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { value, error } = pacienteJoi.validate(req.body, { abortEarly: false });

    if (error) {
      return res.status(404).json({
        message: 'existe erro',
        erro: error.details.map((e) => {
          return e.message;
        }),
      });
    }

    req.body = value;
    next();
  } catch (e) {
    const server = e as Error;
    res.status(500).json({ server });
  }
};
