import { BrowserRouter, Routes, Route } from "react-router-dom"
import App from "../pages/index"
import Paciente from "../pages/paciente/paciente";
import PacienteLista from "../pages/paciente/paciente_lista"
import PacienteCadastro from "../pages/paciente/paciente_cadastro"
import Medico from "../pages/medicos/medico";
import MedicoLista from "../pages/medicos/medico_lista"
import MedicoCadastro from "../pages/medicos/medico_cadastro"
import Layout from "../layout/padrao_layout";

function Routas(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App/>}/>
                <Route element={<Layout />}>
                    <Route path="/paciente" element={<Paciente />}>
                        <Route index element={<PacienteLista />} />
                        <Route path="cadastrar" element={<PacienteCadastro />} />
                    </Route>

                    <Route path="/medico" element={<Medico />}>
                        <Route index element={<MedicoLista />} />
                        <Route path="cadastrar" element={<MedicoCadastro />} />
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default Routas;