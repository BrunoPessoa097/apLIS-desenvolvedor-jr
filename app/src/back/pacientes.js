import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3000/api/v1'
})

export const listarPaciente = async () => {
  const response = await api.get('/paciente')
  return response.data
}

export const adicionarPaciente = async (paciente) => {
    const response = await api.post('/paciente', {
      nome: paciente.nome,
      dataNascimento: paciente.data,
      carteirinha: paciente.carteira,
      cpf: paciente.cpf
    });
    return response;
}

export const updatePaciente = async(id, paciente) =>{
  const response = await api.patch(`/paciente/${id}`, {
    nome: paciente.nome,
    dataNascimento: paciente.data,
    carteirinha: paciente.carteira,
    cpf: paciente.cpf
  });

  return response
}

export const deletarPaciente = async(id)=>{
  return api.delete(`/paciente/${id}`)
}