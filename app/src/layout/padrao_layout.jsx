import { Outlet } from "react-router-dom";
import SideBar from "../componentes/sidebar";

function Layout(){
    return(
        <>
            <div className="flex">
                <SideBar/>
                <main className="flex-1 p-8 bg-sky-900 min-h-screen">
                    <Outlet/>
                </main>
            </div>
            
        </>
    )
}

export default Layout;