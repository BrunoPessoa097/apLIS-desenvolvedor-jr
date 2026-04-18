<?php
    require_once __DIR__ . '/../database/conn.php';

class MedicoRepo {
    private $pdo;

    public function __construct() {
        $this->pdo = Connection::connect();
    }

    public function criar($data){
        $sql = "INSERT INTO medicos (nome, CRM, UFCRM) VALUES(:nome,:CRM,:UFCRM);";
        $stmt = $this->pdo->prepare($sql);

        $stmt->execute([
            ':nome' => $data['nome'],
            ':CRM'  => $data['CRM'],
            ':UFCRM'  => $data['UFCRM']
        ]);

        $id = $this->pdo->lastInsertId();

        return [
            "id"    => $id,
            "nome"  => $data['nome'],
            "CRM"   => $data['CRM'],
            "UFCRM" => $data['UFCRM']
        ];
    }

    public function buscar($nome){
        $sql = "SELECT * FROM medicos WHERE nome = ?";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([$nome]);

        $medico = $stmt->fetch();

        return $medico;
    }

    public function listar(){
        $sql = "SELECT * FROM medicos";
        $stmt = $this->pdo->query($sql);
        return $stmt->fetchAll();
    }

    public function buscarID($id){
        $sql = "SELECT * FROM medicos WHERE id = ?";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([$id]);

        $medico = $stmt->fetch();

        return $medico;
    }

    public function update($id, $data) {

        $sql = "UPDATE medicos SET nome = COALESCE(NULLIF(:nome, ''), nome),CRM = COALESCE(NULLIF(:CRM, ''), CRM),UFCRM = COALESCE(NULLIF(:UFCRM, ''), UFCRM) WHERE id = :id";

        $stmt = $this->pdo->prepare($sql);

        $stmt->execute([
            ':nome'  => $data['nome'] ?? null,
            ':CRM'   => $data['CRM'] ?? null,
            ':UFCRM' => $data['UFCRM'] ?? null,
            ':id'    => $id
        ]);

        return $this->buscarID($id);
    }

    public function delete($id){
        $sql = "DELETE FROM medicos WHERE id=?;";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([$id]);
    }
}