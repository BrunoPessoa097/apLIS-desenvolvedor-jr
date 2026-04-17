import { RowDataPacket } from "mysql2";
interface Pasciente {
    nome: string;
    dataNascimento: Date;
    carteirinha: string;
    cpf: string
}

export interface PascienteMY extends RowDataPacket{
    nome: string;
    dataNascimento: Date;
    carteirinha: string;
    cpf: string
}

export default Pasciente