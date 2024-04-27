<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $review = $_POST['review'];

    // Write review to file
    $file = 'reviews.txt';
    $data = "Name: $name\nEmail: $email\nReview: $review\n\n";
    file_put_contents($file, $data, FILE_APPEND);
}
?>
