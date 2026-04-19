import { NavLink, Outlet } from 'react-router-dom'

function Medico() {
  return (
    <div>
      <h2 className="text-center text-3xl mb-4 text-cyan-50">Medico</h2>

      <nav className="grid grid-cols-2 justify-center text-center space-x-4 bg-slate-600 rounded-sm">
        <NavLink to="/medico"end className="font-bold rounded-lg px-3 py-2 text-cyan-50">
            Listar
        </NavLink>

        <NavLink to="/medico/cadastrar" className="font-bold rounded-lg px-3 py-2 text-cyan-50">
            Cadastro
        </NavLink>
      </nav>

      <Outlet />
    </div>
  )
}

export default Medico