<?php

use Psr\Http\Server\MiddlewareInterface;
use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Server\RequestHandlerInterface;
use Psr\Http\Message\ResponseInterface;

class ValidationMiddleware implements MiddlewareInterface
{
    private $rules;

    public function __construct(callable $rules)
    {
        $this->rules = $rules;
    }

    public function process(ServerRequestInterface $request, RequestHandlerInterface $handler): ResponseInterface
    {
        $data = $request->getParsedBody() ?? [];

        $errors = call_user_func($this->rules, $data);

        if (!empty($errors)) {
            $response = new \Slim\Psr7\Response();

            $response->getBody()->write(json_encode([
                "message" => "Erro de validação",
                "errors" => $errors
            ]));

            return $response
                ->withHeader('Content-Type', 'application/json')
                ->withStatus(422);
        }

        return $handler->handle($request);
    }
}