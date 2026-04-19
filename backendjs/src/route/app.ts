import express, { type Application } from 'express';
import compression from 'compression';
import cors from 'cors';
import { padraoInicial, padraoNoROute } from '../controller/app_controller';
import pacienteRoute from './paciente_route';

const app: Application = express();
app.use(express.json());
app.use(cors());
app.use(
  compression({
    level: 6,
    threshold: 1024,
  }),
);

app.use(pacienteRoute);

app.get('/api/v1', padraoInicial);
app.use(padraoNoROute);

export default app;
