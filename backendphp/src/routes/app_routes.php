<?php

use Slim\App;
require_once __DIR__ . '/../controller/app_controller.php';

return function (App $app) {
    $controller = new Padrao();

    // Rota inicial
    $app->get('/api/v1/', [$controller,'index']);
    // $app->get('/{routes:.+}', [$controller,'default']);
};