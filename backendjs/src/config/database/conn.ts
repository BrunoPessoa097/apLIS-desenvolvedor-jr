import connection from "./mysql";

export const conexao = async()=>{
    try{
        const [rows] = await connection.query("SELECT 1")

        console.log("Banco conectado")
        console.log(rows)
    }catch(e){
        const error = e as Error
        console.log("Erro ao conectar no banco")
        console.log(error)
    }
}

export default conexao