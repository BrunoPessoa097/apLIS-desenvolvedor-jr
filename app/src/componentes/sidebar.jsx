import { Link } from "react-router-dom";

function SideBar(){
    return(
        <>
            <aside className="p-8">
                <h2 className="text-2xl font-bold mb-8">
                    Clinica
                </h2>
                <ul>
                    <li className="flex flex-col gap-3">
                        <Link className="hover:text-sky-700" to="/medico">Medicos</Link>
                        <Link className="hover:text-sky-700" to="/paciente">Paciente</Link>
                        <Link className="hover:text-sky-700" to="/">Inicio</Link>
                    </li>
                </ul>
            </aside>
        </>
    )
}

export default SideBar;