<?php

require __DIR__ . '/../vendor/autoload.php';

use Slim\Factory\AppFactory;
use Dotenv\Dotenv;

$dotenv = Dotenv::createImmutable(__DIR__ . '/../');
$dotenv->load();

$app = AppFactory::create();

$app->addBodyParsingMiddleware();

$app->add(function ($request, $handler) {

    $response = $request->getMethod() === 'OPTIONS'
        ? new \Slim\Psr7\Response()
        : $handler->handle($request);

    return $response
        ->withHeader('Access-Control-Allow-Origin', 'http://localhost:5173')
        ->withHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS')
        ->withHeader('Access-Control-Allow-Credentials', 'true');
});
$app->addErrorMiddleware(true, true, true);

// rotas
(require __DIR__ . '/../src/routes/app_routes.php')($app);
(require __DIR__ . '/../src/routes/medico_routes.php')($app);
// (require __DIR__ . '/../src/routes/medicos_routes.php')($app);

$app->run();