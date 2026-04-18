<?php
    class Padrao{
        public function index($request, $response){
            $response->getBody()->write(json_encode([
                "message" => "API Hospital rodando 🚀",
                "status" => "ok"
            ]));

            return $response->withHeader('Content-Type', 'application/json');
        }

        public function default($request, $response){
            $response->getBody()->write(json_encode([
                "message" => "Rota não encontrada"
            ]));

            return $response->withHeader('Content-Type', 'application/json');
        }
    }