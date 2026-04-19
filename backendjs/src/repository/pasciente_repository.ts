import Paciente, { PacienteMY } from '../config/interface/paciente_interface';
import { ResultSetHeader } from 'mysql2';
import connection from '../config/database/mysql';

export const pacienteAddRepo = async (paciente: Paciente): Promise<boolean> => {
  const { nome, dataNascimento, carteirinha, cpf } = paciente;

  const query = `
        INSERT INTO pacientes (nome, dataNascimento, carteirinha, cpf)
        VALUES (?, ?, ?, ?)
    `;

  const values = [nome, dataNascimento, carteirinha, cpf];

  await connection.execute(query, values);
  return true;
};

export const pacienteExist = async (nome: string): Promise<boolean> => {
  const query = `SELECT  * FROM pacientes WHERE nome=?`;

  const [row] = await connection.query<PacienteMY[]>(query, [nome]);
  return row.length > 0;
};

export const pacienteAllRepo = async (): Promise<Paciente[]> => {
  const query = `SELECT * FROM pacientes`;

  const [rows] = await connection.query<PacienteMY[]>(query);
  return rows;
};

export const pacienteByIdRepo = async (id: number): Promise<PacienteMY[]> => {
  const query = `SELECT * FROM pacientes WHERE id = ?`;

  const [row] = await connection.query(query, [id]);
  return row as PacienteMY[];
};

export const pacientesUpdate = async (id: number, paciente: Paciente): Promise<boolean> => {
  const query = `
        UPDATE hospital.pacientes
        SET
        nome = COALESCE(?, nome),
        dataNascimento = COALESCE(?, dataNascimento),
        carteirinha = COALESCE(?, carteirinha),
        cpf = COALESCE(?, cpf),
        updatedAt = CURRENT_TIMESTAMP
        WHERE id = ?
    `;

  const values = [
    paciente.nome ?? null,
    paciente.dataNascimento ?? null,
    paciente.carteirinha ?? null,
    paciente.cpf ?? null,
    id,
  ];

  const [result] = await connection.execute<ResultSetHeader>(query, values);

  return result.affectedRows > 0;
};

export const pacienteDeleteRepo = async (id: number) => {
  const query = `DELETE FROM pacientes WHERE id = ?`;

  const [result] = await connection.execute<ResultSetHeader>(query, [id]);

  return result.affectedRows;
};
