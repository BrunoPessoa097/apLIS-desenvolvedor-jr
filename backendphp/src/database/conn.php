<?php

class Connection {

    public static function connect() {

        $host = $_ENV['DB_HOST'];
        $port = $_ENV['DB_PORT'];
        $db   = $_ENV['DB_NAME'];
        $user = $_ENV['DB_USER'];
        $pass = $_ENV['DB_PASSWORD'];

        try {
            return new PDO(
                "mysql:host=$host;port=$port;dbname=$db;charset=utf8mb4",
                $user,
                $pass,
                [
                    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                    PDO::ATTR_EMULATE_PREPARES => false
                ]
            );
        } catch (PDOException $e) {
            die(json_encode([
                "error" => "Erro de conexão com o banco",
                "message" => $e->getMessage()
            ]));
        }
    }
}