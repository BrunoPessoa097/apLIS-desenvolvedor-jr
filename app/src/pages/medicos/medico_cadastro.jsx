import {useEffect, useState } from 'react'
import {adicionarMedico,updateMedico} from '../../back/medico'
import { useLocation, useNavigate } from 'react-router-dom'

function MedicoCadastro() {
  const location = useLocation()
  const navigate = useNavigate()

  const [editando, setEditado] = useState(null)

  const [nome, setNome] = useState('');
  const [CRM, setCRM] = useState('')
  const [UFCRM, setUFCRM] = useState('')
  const [saida, setSaida] = useState([])

  useEffect(()=>{
    if(location.state?.medico){
      const medico = location.state.medico;

      setEditado(medico.id)
      setNome(medico.nome)
      setCRM(medico.CRM)
      setUFCRM(medico.UFCRM)
    }
  },[location.state])

  const salvar = async(e)=>{
    e.preventDefault();

    if (!nome || !CRM || !UFCRM) {
      alert("Existem campos vazios!");
      return;
    }

    const medico = {
      nome,
      CRM,
      UFCRM
    }

    // console.log(medico)

    try{
      let res

      if(editando){
        res = await updateMedico(editando,medico)
      }
      else{
        res = await adicionarMedico(medico);
        setSaida([res])
        console.log(res)
      
        if(res.status == 209){
          setSaida([res.data?.message])
        }
        if(res.status == 200){
          setSaida(['pasciente cadastrado'])
        }
      }

      setEditado(null)
      setNome('');
      setCRM('');
      setUFCRM('')

      navigate('/medico')
    }catch(erro){
      const mensagemDeErro = erro.response?.data?.errors || "Erro desconhecidos";
      if (mensagemDeErro) {
        const mensagens = Object.values(mensagemDeErro).flat()
        setSaida(mensagens)
      } else {
        setSaida(['Erro desconhecido'])
      }
    }
  }


  return (
    <div className="py-6 flex flex-col items-center">
      <h3 className="text-xl font-semibold mb-4 text-cyan-50 bg-slate-600 rounded-sm px-10 py-4">
        {
          editando? "Editando " : "Cadastro "
        }
        de Médico
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
          className="border rounded p-3 bg-sky-50"
          onChange={(e) => setNome(e.target.value)}
          value={nome}
          required
        />

        <input
          type="text"
          placeholder="CRM"
          className="border rounded p-3 bg-sky-50"
          onChange={(e) => setCRM(e.target.value)}
          value={CRM}
          required
        />


        <input
          type="text"
          placeholder="UFCRM"
          className="border rounded p-3 bg-sky-50"
          onChange={(e) => setUFCRM(e.target.value)}
          value={UFCRM}
          required
        />

        <button type="submit" className="bg-blue-600 text-white rounded p-3">
          Salvar
        </button>
      </form>
    </div>
  )
}

export default MedicoCadastro