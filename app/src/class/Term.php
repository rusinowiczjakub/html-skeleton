<?php

class Term {
    private $id;
    private $date;
    private $reserved;
    private $person;
    private $conn;

    public function __construct(DateTime $date, boolean $reserved, Person $person) {
        $this->id = -1;
        $this->date = $date;
        $this->reserved = $reserved;
        $this->person = $person;
        $this->conn = new PDO("mysql:host=".DB_HOST.";dbname=" . DB_NAME, DB_USERNAME, DB_PASSWORD);
    }

    public function saveToDb()
    {
        if ($this->id === -1) {
            $query = '
            INSERT INTO term (date, reserved, $person_id) VALUES (:date, :reserved, :person_id)
            ';
            $stmt = $this->conn->prepare($query);
            $result = $stmt->execute([
                'date' => $this->date,
                'reserved' => $this->reserved,
                'person_id' => $this->person->getId()
            ]);

            if ($result !== false) {
                return true;
            }
        }

        return false;
    }

    public function loadFreeTerms()
    {
    }

    public function loadTermsByDate($date)
    {
        $query = "
        SELECT * FROM term
        WHERE DATE_FORMAT(date, '%Y-%m-%d') =
        DATE_FORMAT(" . '"' .$date . '"' . ", '%Y-%m-%d')
        AND reserved = 0
        ";

        $stmt = $conn->prepare($query);
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

        return $result;
    }
}
