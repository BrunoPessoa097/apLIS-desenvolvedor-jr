<?php
require_once __DIR__ . '/../repository/medico_repository.php';

class MedicoController {

    private $repo;

    public function __construct() {
        $this->repo = new MedicoRepo();
    }

    public function medicoAdicionar($request, $response) {
        $data = $request->getParsedBody();

        $exist = $this->repo->buscar($data['nome']);

        if($exist){
            $response->getBody()->write(json_encode([
                "message" => "Conflito médico ja encontra salvo",
            ]));

            return $response->withHeader('Content-Type', 'application/json');
        }

        $medico = $this->repo->criar($data);

        $response->getBody()->write(json_encode([
            "message" => "Médico adicionado",
            "inserido" => $medico
        ]));

        return $response->withHeader('Content-Type', 'application/json');
    }

    public function medicoListar($request, $response) {
        $lista = $this->repo->listar();

        $response->getBody()->write(json_encode([
            "message" => "Médico listar",
            "lista" => $lista
        ]));

        return $response->withHeader('Content-Type', 'application/json');
    }

    public function medicoById($request, $response, $args) {
        $data = $this->repo->buscarID($args['id']);

        if(!$data){
            $response->getBody()->write(json_encode([
                "message" => "Médico Não encontrado",
            ]));

            return $response->withHeader('Content-Type', 'application/json');
        }


        $response->getBody()->write(json_encode([
            "message" => "Médico ID",
            "medico"=> $data
        ]));

        return $response->withHeader('Content-Type', 'application/json');
    }

    public function medicoUpdate($request, $response,$args) {
        $data = $request->getParsedBody();

        $exist = $this->repo->buscar($data['nome']);

        if($exist){
            $response->getBody()->write(json_encode([
                "message" => "Conflito médico ja encontra salvo",
            ]));

            return $response->withHeader('Content-Type', 'application/json');
        }

        $data = $this->repo->buscarID($args['id']);

        if(!$data){
            $response->getBody()->write(json_encode([
                "message" => "Médico Não encontrado",
            ]));

            return $response->withHeader('Content-Type', 'application/json');
        }

        $atualizar = $this->repo->update($args['id'],$data);

        $response->getBody()->write(json_encode([
            "message" => "Médico Update",
            "atualizado"=> $atualizar
        ]));

        return $response->withHeader('Content-Type', 'application/json');
    }

    public function medicoDelete($request, $response,$args) {
        $id = $args['id'];
        $data = $this->repo->buscarID($id);

        if(!$data){
            $response->getBody()->write(json_encode([
                "message" => "Médico não encontrado"
            ]));

            return $response->withHeader('Content-Type', 'application/json');
        }

        $this->repo->delete($id);

        $response->getBody()->write(json_encode([
            "message" => "Médico Delete"
        ]));

        return $response->withHeader('Content-Type', 'application/json');
    }
}