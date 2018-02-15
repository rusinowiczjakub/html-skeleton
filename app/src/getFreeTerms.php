<?php

require_once __DIR__. '/../../config.php';
require_once __DIR__.'/class/Person.php';
require_once __DIR__.'/class/Term.php';


if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (isset($_GET['month']) && !isset($_GET['day'])) {
        $month = intval($_GET['month']);
        $freeTerms = Term::loadTermsByMonth();

        $res = [];
        foreach ($freeTerms as $term) {
            $res[] = $term->jsonSerialize();
        }
        if (count($res) < 1) {
            $response = json_encode([
                'status' => 0,
                'msg' => 'Brak wolnych terminów w wybranym miesiącu'
            ]);

            echo $response;

            return false;

        }
        $response = json_encode([
            'status' => 1,
            'data' => $res
        ]);

        echo $response;

        return true;
    }

    if (isset($_GET['day']) && isset($_GET['month'])) {

    }

}
