import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:8080/api/v1'
})

export const listarMedico = async () => {
  const response = await api.get('/medicos')
  return response.data
}

export const adicionarMedico = async (medico) => {
    const response = await api.post('/medicos', {
      nome: medico.nome,
      CRM: medico.CRM,
      UFCRM: medico.UFCRM,
    });
    return response;
}

export const updateMedico = async(id, medico) =>{
  const response = await api.patch(`/medicos/${id}`, {
    nome: medico.nome,
    CRM: medico.CRM,
    UFCRM: medico.UFCRM,
  });

  return response
}

export const deletarMedico = async(id)=>{
  return api.delete(`/medicos/${id}`)
}