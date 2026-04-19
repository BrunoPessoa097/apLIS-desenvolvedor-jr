import { RowDataPacket } from 'mysql2';
interface Paciente {
  nome: string;
  dataNascimento: Date;
  carteirinha: string;
  cpf: string;
}

export interface PacienteMY extends RowDataPacket {
  nome: string;
  dataNascimento: Date;
  carteirinha: string;
  cpf: string;
}

export default Paciente;
