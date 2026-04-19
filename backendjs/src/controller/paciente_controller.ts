import { Request, Response } from 'express';
// import cache from '../config/utils/node';
import {
  pacienteAddRepo,
  pacienteExist,
  pacienteAllRepo,
  pacienteByIdRepo,
  pacientesUpdate,
  pacienteDeleteRepo,
} from '../repository/pasciente_repository';
import { PacienteMY } from '../config/interface/paciente_interface';

export const pacienteAdd = async (req: Request, res: Response) => {
  try {
    const { nome } = req.body;

    const exist: boolean = await pacienteExist(nome);

    if (exist) {
      return res.status(209).json({
        message: 'paciente já encontrase cadastrado',
      });
    }

    await pacienteAddRepo(req.body);

    return res.status(200).json({
      message: 'paciente',
      paciente: req.body,
    });
  } catch (e) {
    const erro = e as Error;
    res.status(500).json({
      erro,
    });
  }
};

export const pacienteAll = async (req: Request, res: Response) => {
  try {
    // const pacienteCache = cache.get('paciente');
    // if (pacienteCache) {
    //   return res.status(200).json({
    //     message: 'lista de usuario',
    //     paciente: pacienteCache,
    //   });
    // }
    const paciente = await pacienteAllRepo();
    // cache.set('paciente', paciente);

    return res.status(200).json({
      message: 'lista de paciente',
      paciente,
    });
  } catch (e) {
    const erro = e as Error;
    res.status(500).json({
      erro,
    });
  }
};

export const pacienteById = async (req: Request<{ id: number }>, res: Response) => {
  try {
    const { id } = req.params;
    const paciente: PacienteMY[] = await pacienteByIdRepo(id);

    return res.status(200).json({
      message: 'Paciente',
      paciente,
    });
  } catch (e) {
    const erro = e as Error;
    res.status(500).json({
      erro,
    });
  }
};

export const pacienteUpdate = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    const paciente = await pacienteByIdRepo(id);

    if (!paciente) {
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

export const pacienteDelete = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    const paciente = await pacienteByIdRepo(id);

    if (!paciente) {
      return res.status(404).json({
        message: 'Paciente não encontrado',
      });
    }

    const deleted = await pacienteDeleteRepo(id);

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
