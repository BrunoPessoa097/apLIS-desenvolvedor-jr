<?php
    use Slim\App;
    require_once __DIR__ . '/../controller/medico_controller.php';
    require_once __DIR__ . '/../middleware/validator.php';
    require_once __DIR__ . '/../validator/medico_validator.php';

return function (App $app){
    $medico = new MedicoController();
    $validateMedico = new ValidationMiddleware([MedicoValidator::class, 'rules']);

    $app->post('/api/v1/medicos', [$medico,'medicoAdicionar'])->add($validateMedico);
    $app->get('/api/v1/medicos', [$medico,'medicoListar']);
    $app->get('/api/v1/medicos/{id}', [$medico,'medicoById']);
    $app->patch('/api/v1/medicos/{id}', [$medico,'medicoUpdate']);
    $app->delete('/api/v1/medicos/{id}', [$medico,'medicoDelete']);
};