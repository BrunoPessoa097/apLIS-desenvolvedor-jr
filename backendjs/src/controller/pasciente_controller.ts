import { Request, Response } from 'express';
import cache from '../config/utils/node';
import {
  pascienteAddRepo,
  pascienteExist,
  pascienteAllRepo,
  pascienteByIdRepo,
  pacientesUpdate,
  pascienteDeleteRepo,
} from '../repository/pasciente_repository';
import { PascienteMY } from '../config/interface/pasciente_interface';

export const pascienteAdd = async (req: Request, res: Response) => {
  try {
    const { nome } = req.body;

    const exist: boolean = await pascienteExist(nome);

    if (exist) {
      return res.status(209).json({
        message: 'pasciente já encontrase cadastrado',
      });
    }

    await pascienteAddRepo(req.body);

    return res.status(200).json({
      message: 'pasciente',
      pasciente: req.body,
    });
  } catch (e) {
    const erro = e as Error;
    res.status(500).json({
      erro,
    });
  }
};

export const pascienteAll = async (req: Request, res: Response) => {
  try {
    const pascienteCache = cache.get('pasciente');
    if (pascienteCache) {
      return res.status(200).json({
        message: 'lista de usuario',
        pasciente: pascienteCache,
      });
    }
    const pasciente = await pascienteAllRepo();
    cache.set('pasciente', pasciente);

    return res.status(200).json({
      message: 'lista de pasciente',
      pasciente,
    });
  } catch (e) {
    const erro = e as Error;
    res.status(500).json({
      erro,
    });
  }
};

export const pascienteById = async (req: Request<{ id: number }>, res: Response) => {
  try {
    const { id } = req.params;
    const pasciente: PascienteMY[] = await pascienteByIdRepo(id);

    return res.status(200).json({
      message: 'Pasciente',
      pasciente,
    });
  } catch (e) {
    const erro = e as Error;
    res.status(500).json({
      erro,
    });
  }
};

export const pascienteUpdate = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    const pasciente = await pascienteByIdRepo(id);

    if (!pasciente) {
      return res.status(404).json({
        message: 'Paciente não encontrado',
      });
    }

    const updated = await pacientesUpdate(id, req.body);

    if (!updated) {
      return res.status(400).json({
        message: 'Nada foi atualizado',
      });
    }

    return res.status(200).json({
      message: 'Paciente atualizado com sucesso',
    });
  } catch (e) {
    const erro = e as Error;
    res.status(500).json({
      erro: erro.message,
    });
  }
};

export const pascienteDelete = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    const pasciente = await pascienteByIdRepo(id);

    if (!pasciente) {
      return res.status(404).json({
        message: 'Paciente não encontrado',
      });
    }

    const deleted = await pascienteDeleteRepo(id);

    if (deleted === 0) {
      return res.status(400).json({
        message: 'Nada foi deletado',
      });
    }

    return res.status(200).json({
      message: 'Paciente deletado com sucesso',
    });
  } catch (e) {
    const erro = e as Error;
    res.status(500).json({
      erro: erro.message,
    });
  }
};
