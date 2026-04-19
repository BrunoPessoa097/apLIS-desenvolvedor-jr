import app from './route/app.js';
import 'dotenv/config';
import conexao from './config/database/conn.js';

const PORT: number = Number(process.env.PORT) || 5000;

app.listen(PORT, () => {
  console.log(`API rodando na port ${PORT}`);
  conexao();
});
