import { Request, Response } from 'express';

export const padraoInicial = (req: Request, res: Response) => {
  res.status(200).json({
    menssage: 'rota inicial',
  });
};

export const padraoNoROute = (req: Request, res: Response) => {
  res.status(200).json({
    menssage: 'rota não encontrado',
  });
};
