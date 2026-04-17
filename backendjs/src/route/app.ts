import express,{type Application} from "express"
import compression from "compression"
import {padraoInicial,padraoNoROute} from "../controller/app_controller"
import pascienteRoute from "./pasciente_route"

const app: Application = express()
app.use(express.json())
app.use(compression({
    level:6,
    threshold: 1024
}))

app.use(pascienteRoute)

app.get("/api/v1",padraoInicial)
app.use(padraoNoROute)

export default app