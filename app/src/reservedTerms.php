<?php

require_once __DIR__.'/../../config.php';
require_once __DIR__.'/class/Term.php';
require_once __DIR__.'/class/Person.php';

if ($_SERVER['REQUEST_METHOD'] === "GET") {

    $reservedTerms = Term::loadReservedTerms();

    if (isset($_GET['month'])) {
        $reservedTerms = Term::loadReservedTerms($_GET['month']);
    }

    if (count($reservedTerms) > 0) {
        echo json_encode([
            'status' => 1,
            'data' => $reservedTerms
        ]);

        return true;
    }

    echo json_encode([
        'status' => 0,
        'data' => null
    ]);

    return false;
}
