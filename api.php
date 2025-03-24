<?php
$servername = "localhost";
$username = "your_db_user";
$password = "your_db_pass";
$dbname = "rvm_database";

// Connect to MySQL
$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("❌ Connection failed: " . $conn->connect_error);
}

// Get data from NodeMCU
$user = $_POST['username'];
$pass = $_POST['password'];
$bottles = $_POST['bottles'];
$points = $_POST['points'];

// Check if user exists
$sql = "SELECT * FROM users WHERE username='$user'";
$result = $conn->query($sql);

if ($result->num_rows == 0) {
    // Create new user
    $sql = "INSERT INTO users (username, password, bottles, points) VALUES ('$user', '$pass', 0, 0)";
    $conn->query($sql);
    echo "✅ User Created!";
}

// Update user points
$sql = "UPDATE users SET bottles = bottles + $bottles, points = points + $points WHERE username='$user'";
if ($conn->query($sql) === TRUE) {
    echo "✅ Points Updated!";
} else {
    echo "❌ Error updating record: " . $conn->error;
}

$conn->close();
?>
