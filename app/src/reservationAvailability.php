<?php

require_once __DIR__. '/../../config.php';
require_once __DIR__.'/class/Person.php';
require_once __DIR__.'/class/Term.php';


if ($_SERVER['REQUEST_METHOD'] === 'GET') {

    $month = intval($_GET['months']) < 10 ? '0' . $_GET['months'] : $_GET['months'];
    $day= intval($_GET['days']) < 10 ? '0' . $_GET['days'] : $_GET['days'];

    $date = '2018-' . $month . '-' . $day;


    $freeTerms = Term::loadFreeTermsByDate($date, Term::setConnetcion());

    $res = [];
    foreach ($freeTerms as $term) {
        $res[] = $term->jsonSerialize();
    }

    if (count($res) < 1) {
        $response = json_encode([
            'status' => 0,
            'message' => 'Brak wolnych terminów w wybranym dniu'
        ]);

    echo $response;

    } else {

        $response = json_encode([
            'status' => 1,
            'data' => $res
        ]);

    echo $response;

    }
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $date = new DateTime($_POST['date']);
  $fullDate = $date->format('Y-m-d H:m');

  $term = Term::loadSingleFreeTerm($fullDate, Term::setConnetcion());

  $person = new Person($_POST['name'], $_POST['phone'], $_POST['email']);
  $person->saveToDb();

  $term->setPerson($person);
  $term->saveToDb();

}
