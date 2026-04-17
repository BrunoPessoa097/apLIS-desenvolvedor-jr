import Pasciente,{PascienteMY} from "../config/interface/pasciente_interface";
import { ResultSetHeader } from "mysql2"
import connection from "../config/database/mysql"

export const pascienteAddRepo = async(pasciente: Pasciente):Promise<boolean>=>{
    const {nome, dataNascimento, carteirinha, cpf } = pasciente

    const query = `
        INSERT INTO pacientes (nome, dataNascimento, carteirinha, cpf)
        VALUES (?, ?, ?, ?)
    `

    const values = [
        nome,
        dataNascimento,
        carteirinha,
        cpf
    ]

    await connection.execute(query,values)
    return true
}

export const pascienteExist = async(nome: string):Promise<boolean>=>{
    const query = `SELECT  * FROM pacientes WHERE nome=?`

    const [row] = await connection.query<PascienteMY[]>(query,[nome])
    return row.length > 0
}

export const pascienteAllRepo = async():Promise<Pasciente[]>=>{
    const query =  `SELECT * FROM pacientes`

    const [rows] = await connection.query<PascienteMY[]>(query)
    return rows
}

export const pascienteByIdRepo = async(id: number):Promise<PascienteMY[]>=>{
    const query = `SELECT * FROM pacientes WHERE id = ?`

    const [row] = await connection.query(query,[id])
    return row as PascienteMY[]
}

export const pacientesUpdate = async(id: number, pasciente: Pasciente):Promise<boolean>=>{
    const query = `
        UPDATE hospital.pacientes
        SET
        nome = COALESCE(?, nome),
        dataNascimento = COALESCE(?, dataNascimento),
        carteirinha = COALESCE(?, carteirinha),
        cpf = COALESCE(?, cpf),
        updatedAt = CURRENT_TIMESTAMP
        WHERE id = ?
    `

    const values = [
        pasciente.nome ?? null,
        pasciente.dataNascimento ?? null,
        pasciente.carteirinha ?? null,
        pasciente.cpf ?? null,
        id
    ]

    const [result] = await connection.execute<ResultSetHeader>(
        query,
        values
    )

    return result.affectedRows > 0
}

export const pascienteDeleteRepo = async(id: number)=>{
    const query = `DELETE FROM pacientes WHERE id = ?`

    const [result] = await connection.execute<ResultSetHeader>(query, [id])

    return result.affectedRows
}