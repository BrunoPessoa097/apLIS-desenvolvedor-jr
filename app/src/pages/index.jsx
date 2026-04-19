import {NavLink} from "react-router-dom"
function App() {
  return (
    <>
        <div className="bg-slate-600 w-screen h-screen flex items-center justify-center">
          <div className="bg-white text-black p-6 w-80 h-80 rounded-3xl">
                <h1 className="text-center text-4xl">Clínica</h1>
                <p className="aling-center py-2">Desafio realizado por Bruno Pessoa</p>
                <h3>Proximas features:</h3>
                <ul className="mb-9">
                  <li>-Autenticação</li>
                  <li>-JWT</li>
                  <li>-Seguranca com helmet e politcs</li>
                </ul>

                <div className="items-center justify-center p-6">
                  <NavLink to="/medico" className="font-bold rounded-lg px-3 py-2 text-black tems-center justify-center">
                    Click aqui para acessar
                  </NavLink>
                </div>
                
            </div>
        </div>
        
    </>
  )
}

export default App
