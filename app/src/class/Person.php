<?php

class Person
{
    private $id;
    private $name;
    private $phone;
    private $email;
    private $conn;

    public function __construct($name = null, $phone = null, $email = null)
    {
        $this->id = -1;
        $this->name = $name;
        $this->phone = $phone;
        $this->email = $email;
        $this->conn = new PDO("mysql:host=".DB_HOST.";dbname=" . DB_NAME, DB_USERNAME, DB_PASSWORD);
    }

    public function saveToDb()
    {
        if ($this->id === -1) {

            $query = '
            INSERT INTO person (name, phone, email) VALUES (:name, :phone, :email)
            ';

            $stmt = $this->conn->prepare($query);
            $result = $stmt->execute([
                'name' => $this->name,
                'phone' => $this->phone,
                'email' => $this->email
            ]);

            if ($result === true) {
                $this->id = $this->conn->lastInsertId();
                return true;
            }
        }


        return false;
    }

    /**
     * @return mixed
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * @param mixed $id
     */
    public function setId($id)
    {
        $this->id = $id;
    }

    /**
     * @return null
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * @param null $name
     */
    public function setName($name)
    {
        $this->name = $name;
    }

    /**
     * @return null
     */
    public function getPhone()
    {
        return $this->phone;
    }

    /**
     * @param null $phone
     */
    public function setPhone($phone)
    {
        $this->phone = $phone;
    }

    /**
     * @return null
     */
    public function getEmail()
    {
        return $this->email;
    }

    /**
     * @param null $email
     */
    public function setEmail($email)
    {
        $this->email = $email;
    }



}
