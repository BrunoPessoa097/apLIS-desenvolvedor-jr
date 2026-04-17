import { Router } from "express";
import {pascienteValidate} from "../middleware/pasciente_middleware"
import {pascienteAdd,pascienteAll,pascienteById,pascienteUpdate,pascienteDelete} from "../controller/pasciente_controller"

const pascienteRoute: Router = Router()

pascienteRoute.route("/api/v1/pasciente")
    .post(pascienteValidate,pascienteAdd)
    .get(pascienteAll)

pascienteRoute.route("/api/v1/pasciente/:id")
    .get(pascienteById)
    .patch(pascienteValidate,pascienteUpdate)
    .delete(pascienteDelete)

export default pascienteRoute