<?php

require __DIR__ . '/../vendor/autoload.php';

use Slim\Factory\AppFactory;
use Dotenv\Dotenv;

$dotenv = Dotenv::createImmutable(__DIR__ . '/../');
$dotenv->load();

$app = AppFactory::create();

$app->addBodyParsingMiddleware();
$app->addErrorMiddleware(true, true, true);

// rotas
(require __DIR__ . '/../src/routes/app_routes.php')($app);
(require __DIR__ . '/../src/routes/medico_routes.php')($app);
// (require __DIR__ . '/../src/routes/medicos_routes.php')($app);

$app->run();