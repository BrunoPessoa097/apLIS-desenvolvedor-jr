import { Router } from 'express';
import { pacienteValidate } from '../middleware/pasciente_middleware';
import {
  pacienteAdd,
  pacienteAll,
  pacienteById,
  pacienteUpdate,
  pacienteDelete,
} from '../controller/paciente_controller';

const pacienteRoute: Router = Router();

pacienteRoute.route('/api/v1/paciente').post(pacienteValidate, pacienteAdd).get(pacienteAll);

pacienteRoute
  .route('/api/v1/paciente/:id')
  .get(pacienteById)
  .patch(pacienteValidate, pacienteUpdate)
  .delete(pacienteDelete);

export default pacienteRoute;
