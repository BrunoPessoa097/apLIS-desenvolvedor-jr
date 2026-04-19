import {useEffect, useState } from 'react'
import {adicionarPaciente,updatePaciente} from "../../back/pacientes"
import { useLocation, useNavigate } from 'react-router-dom'

function PacienteCadastro() {
  const location = useLocation()
  const navigate = useNavigate()

  const [editando, setEditado] = useState(null)

  const [nome, setNome] = useState('');
  const [data, setData] = useState('');
  const [carteira, setCarteira] = useState('');
  const [cpf, setCPF] = useState('');
  const [saida, setSaida] = useState([])

  useEffect(()=>{
    if(location.state?.paciente){
      const paciente = location.state.paciente;

      setEditado(paciente.id)
      setNome(paciente.nome)
      setData(paciente.dataNascimento?.split('T')[0] || '')
      setCarteira(paciente.carteirinha)
      setCPF(paciente.cpf)
    }
  },[location.state])

  const salvar = async(e)=>{
    e.preventDefault();

    if (!nome || !data || !carteira || !cpf) {
      alert("Existem campos vazios!");
      return;
    }

    const paciente = {
      nome,
      data,
      carteira,
      cpf
    }


    try{
      let res

      if(editando){
        res = await updatePaciente(editando,paciente)
      }
      else{
        res = await adicionarPaciente(paciente);
      
        if(res.status == 209){
          setSaida([res.data?.message])
        }
        if(res.status == 200){
          setSaida(['pasciente cadastrado'])
        }
      }

      setEditado(null)
      setNome('');
      setData('');
      setCarteira('');
      setCPF('');

      navigate('/paciente')
    }catch(erro){
      const mensagemDeErro = erro.response?.data?.erro || "Erro desconhecido ao cadastrar";
      setSaida(mensagemDeErro)
    }
  }


  return (
    <div className="py-6 flex flex-col items-center">
      <h3 className="text-xl font-semibold mb-4 text-cyan-50 bg-slate-600 rounded-sm px-10 py-4">
        {
          editando? "Editando " : "Cadastro "
        }
        de Paciente
      </h3>
      {
        saida.map((e,i)=>(
          <h3 key={i} className='text-cyan-50'>{e}</h3>
        ))
      }
      <form onSubmit={salvar} className="flex flex-col gap-3 max-w-md">
        <input
          type="text"
          placeholder="Nome"
          value={nome}
          className="border rounded p-3 bg-sky-50"
          onChange={(e) => setNome(e.target.value)}
          required
        />

        <input
          type="date"
          placeholder="Data de Nascimento"
          className="border rounded p-3 bg-sky-50"
          onChange={(e) => setData(e.target.value)}
          value={data}
          required
        />

        <input
          type="text"
          placeholder="Carteirinha"
          className="border rounded p-3 bg-sky-50"
          onChange={(e) => setCarteira(e.target.value)}
          value={carteira}
          required
        />

        <input
          type="text"
          placeholder="CPF"
          className="border rounded p-3 bg-sky-50"
          onChange={(e) => setCPF(e.target.value)}
          value={cpf}
          required
        />

        <button type="submit" className="bg-blue-600 text-white rounded p-3">
          Salvar
        </button>
      </form>
    </div>
  )
}

export default PacienteCadastro