import {Request, Response, NextFunction } from "express";
import pascienteJoi from "../config/joi/pasciente_joi";

export const pascienteValidate = (req:Request, res:Response,next:NextFunction) =>{
    try{
        const { value, error } = pascienteJoi.validate(req.body, {abortEarly: false})

        if (error) {
            return res.status(404).json({
                        message: 'existe erro',
                        erro: error.details.map((e) => {
                            return e.message
                        }),
                    })
        }

        req.body = value
        next();

    }catch(e){
        const server = e as Error
        res.status(500).json({server})
    }
    
}