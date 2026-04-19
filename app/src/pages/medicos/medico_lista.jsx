import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { listarMedico,deletarMedico } from '../../back/medico';


function MedicoLista() {
    const navegacao = useNavigate();

    const [medico, setMedico]= useState([]);

    const deletar = async(id)=>{
        try{
            await deletarMedico(id)
            await listagemMedico();
        }catch(erro){
            console.log(erro)
        }
    }

    const updateMedico = async(medico) =>{
        navegacao('/medico/cadastrar',{
            state: {
                medico
            }
        })
    }
    const listagemMedico = async()=>{
        try{
            const data = await listarMedico()
            setMedico(data.lista);
        }catch(error){
            console.log(error)
        }
    }

    useEffect(()=>{
        listagemMedico()
    },[])

    return (
        <div className="py-10 flex flex-col items-center">
        <h3 className="text-xl font-semibold mb-4 text-cyan-50 bg-slate-600 rounded-sm px-10 py-4">
            Lista de  Medicos
        </h3>

        <div className="p-4 rounded w-full max-w-md">
            {medico.map((e) => (
                <div key={e.id} className="bg-sky-50 rounded-sm mb-1 flex flex-col gap-2 p-8 sm:flex-row sm:items-center sm:gap-6 sm:py-4">
                    <div className="space-y-2 text-center sm:text-left">
                        <div className="space-y-0.5">
                            <p className="text-lg font-semibold text-black">Nome: {e.nome}</p>
                            <p className="font-medium text-gray-500">Carteirinha {e.CRM}</p>
                            <p className="font-medium text-gray-500">Carteirinha {e.UFCRM}</p>
                            <div className='grid grid-cols-2 gap-2'>
                                <button
                                    onClick={() => deletar(e.id)}
                                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                                >
                                    Excluir
                                </button>

                                <button
                                    onClick={() => updateMedico(e)}
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

export default MedicoLista