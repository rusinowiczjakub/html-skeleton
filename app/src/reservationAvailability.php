<?php
require_once __DIR__. '/../../config.php';

try {
    $conn = new PDO("mysql:host=".DB_HOST.";dbname=" . DB_NAME, DB_USERNAME, DB_PASSWORD);
} catch(PDOException $e) {
    echo json_encode([
        'status' => 0,
        'message' => 'Wystąpił błąd, spróbuj ponownie później'
    ]);

    exit();
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {

    $month = intval($_GET['months']) < 10 ? '0' . $_GET['months'] : $_GET['months'];
    $day= intval($_GET['days']) < 10 ? '0' . $_GET['days'] : $_GET['days'];

    $date = '2018-' . $month . '-' . $day;
    $query = "
    SELECT * FROM term
    WHERE DATE_FORMAT(date, '%Y-%m-%d') =
    DATE_FORMAT(" . '"' .$date . '"' . ", '%Y-%m-%d')
    AND reserved = 0
    ";

    $stmt = $conn->prepare($query);
    $stmt->execute();

    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

    if (count($result) < 1) {
        $response = json_encode([
            'status' => 0,
            'message' => 'Brak wolnych terminów w wybranym dniu'
        ]);

    echo $response;

    } else {

        $response = json_encode([
            'status' => 1,
            'data' => $result
        ]);

    echo $response;

    }
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  var_dump($_POST);
}
