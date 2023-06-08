<?php

$conn = new mysqli("localhost", "root", "", "franchise");

if ($conn->connect_error) {
    echo $conn->error;
}
