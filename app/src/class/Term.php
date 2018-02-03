<?php


class Term implements JsonSerializable {
    private $id;
    private $date;
    private $reserved;
    private $person;
    private $conn;

    public function __construct(DateTime $date = null, $reserved = null, Person $person = null) {
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
            INSERT INTO term (date, reserved) VALUES (:date, :reserved)
            ';
            $stmt = $this->conn->prepare($query);
            $result = $stmt->execute([
                'date' => $this->date,
                'reserved' => $this->reserved,
            ]);

            if ($result === true) {
                $this->id = $this->conn->lastInsertId();
                return true;
            }

        } else {
            $query = '
            UPDATE term SET person_id=:person_id, reserved=:reserved WHERE id=:id
            ';

            $stmt = $this->conn->prepare($query);
            var_dump($this->person->getId());
            $result = $stmt->execute([
                'id' => $this->id,
                'person_id' => $this->person->getId(),
                'reserved' => true
            ]);

            if ($result === true) {
                return true;
            }
        }

        return false;
    }

    public function loadClosestFreeTerms()
    {

    }

    public static function loadSingleFreeTerm($fullDate, $conn) {

        $query = "
        SELECT * FROM term
        WHERE DATE_FORMAT(date, '%Y-%m-%d %H:%m') =
        DATE_FORMAT(" . '"' .$fullDate . '"' . ", '%Y-%m-%d %H:%m')
        AND reserved = 0
        ";

        $stmt = $conn->prepare($query);
        $stmt->execute();
        $result = $stmt->fetch(PDO::FETCH_ASSOC);

        $loadedTerm = new Term();
        $loadedTerm->setId($result['id']);
        $loadedTerm->setDate($result['date']);
        $loadedTerm->setReserved($result['reserved']);

        return $loadedTerm;
    }

    public static function loadFreeTermsByDate(string $date, $conn)
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

        $res = [];

        if ($result > 0) {
            foreach ($result as $row) {
                $loadedTerm = new Term();
                $loadedTerm->setId($row['id']);
                $loadedTerm->setDate($row['date']);
                $loadedTerm->setReserved($row['reserved']);

                $res[] = $loadedTerm;
            }
        }

        return $res;
    }

    public static function setConnetcion()
    {
        $conn = new PDO("mysql:host=".DB_HOST.";dbname=" . DB_NAME, DB_USERNAME, DB_PASSWORD);

        return $conn;
    }

    /**
     * @param int $id
     */
    public function setId($id)
    {
        $this->id = $id;
    }

    /**
     * @param DateTime $date
     */
    public function setDate($date)
    {
        $this->date = $date;
    }

    /**
     * @param null $reserved
     */
    public function setReserved($reserved)
    {
        $this->reserved = $reserved;
    }

    /**
     * @param Person $person
     */
    public function setPerson(Person $person)
    {
        $this->person = $person;
    }


    /**
     * @return int
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * @return DateTime
     */
    public function getDate()
    {
        return $this->date;
    }

    /**
     * @return null
     */
    public function getReserved()
    {
        return $this->reserved;
    }

    /**
     * @return Person
     */
    public function getPerson()
    {
        return $this->person;
    }

    public function jsonSerialize()
    {
        return [
            'id' => $this->id,
            'date' => $this->date,
            'reserved' => $this->reserved
        ];
    }


}


//var_dump(Term::loadFreeTermsByDate('2018-02-03', Term::setConnetcion()));

Term::loadSingleFreeTerm('2018-02-03 18:00', Term::setConnetcion());
