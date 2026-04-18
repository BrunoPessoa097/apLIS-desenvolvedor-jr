<?php

use Respect\Validation\Validator as v;

class MedicoValidator{
    public static function rules($data){
        $erros = [];

        if (!v::stringType()->length(3, 100)->validate($data['nome'] ?? null)) {
            $errors['nome'] = "Nome deve ter entre 3 e 100 caracteres";
        }

        if (!v::stringType()->length(3, 100)->validate($data['CRM'] ?? null)) {
            $errors['CRM'] = "CRM deve ter entre 3 e 100 caracteres";
        }

        if (!v::stringType()->length(3, 100)->validate($data['UFCRM'] ?? null)) {
            $errors['UFCRM'] = "UFCRM deve ter entre 3 e 100 caracteres";
        }

        return $errors;
    }
}