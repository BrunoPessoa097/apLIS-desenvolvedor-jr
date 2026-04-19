import {listarPaciente,deletarPaciente} from '../../back/pacientes';
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'


function PacienteLista() {
    const navegacao = useNavigate();

    const [paciente, setPasciente]= useState([]);

    const deletarPasciente = async(id)=>{
        try{
            await deletarPaciente(id)
            await listagemPaciente()
        }catch(erro){
            console.log(erro)
        }
    }

    const updatePaciente = async(paciente) =>{
        navegacao('/paciente/cadastrar',{
            state: {
                paciente
            }
        })
    }
    const listagemPaciente = async()=>{
        try{
            const data = await listarPaciente()
            setPasciente(data.paciente);
        }catch(error){
            console.log(error)
        }
    }

    useEffect(()=>{
        listagemPaciente()
    },[])

    return (
        <div className="py-10 flex flex-col items-center">
        <h3 className="text-xl font-semibold mb-4 text-cyan-50 bg-slate-600 rounded-sm px-10 py-4">
            Lista de Paciente
        </h3>

        <div className="p-4 rounded w-full max-w-md">
            {paciente.map((e) => (
                <div key={e.id} className="bg-sky-50 rounded-sm mb-1 flex flex-col gap-2 p-8 sm:flex-row sm:items-center sm:gap-6 sm:py-4">
                    <div className="space-y-2 text-center sm:text-left">
                        <div className="space-y-0.5">
                            <p className="text-lg font-semibold text-black">Nome: {e.nome}</p>
                            <p className="font-medium text-gray-500">Carteirinha {e.carteirinha}</p>
                            <div className='grid grid-cols-2 gap-2'>
                                <button
                                    onClick={() => deletarPasciente(e.id)}
                                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                                >
                                    Excluir
                                </button>

                                <button
                                    onClick={() => updatePaciente(e)}
                                    className="bg-sky-600 text-white px-4 py-2 rounded hover:bg-sky-900"
                                >
                                    Atualizar
                                </button>
                            </div>
                            
                        </div>
                    </div>
                </div>
            ))}
        </div>
        </div>
    )
}

export default PacienteLista