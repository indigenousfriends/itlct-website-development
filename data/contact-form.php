<?php

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // Retrieve form data from the $_POST array
    $name = $_POST['name-input'];
    $email = $_POST['email-input'];
    $message = $_POST['message-input'];

    // Email addresses
    $info = 'solivan@indigenousfriends.org';

    // Sender and recipient email addresses
    $from = "info+websiteform@iftheselandscouldtalk.org";
    $to = $info;
    $cc = "max@indigenousfriends.org";

    // Success redirect URL
    $successURL = $_SERVER['HTTP_REFERER'] . '?success=true#contact-us-form';
    $failURL = $_SERVER['HTTP_REFERER'] . '?success=false#contact-us-form';


    // Email subject, headers, and body
    $subject = "New $regarding message from the ITLCT website form";
    $headers = "From: ITLCT website form <$from>" . "\r\n" .
        "Reply-To: $name <$email>" . "\r\n" .
        "CC: $cc" . "\r\n" .
        "MIME-Version: 1.0\r\n" .
        "Content-type: text/html; charset=iso-8859-1\r\n" .
        'X-Mailer: PHP/' . phpversion();

    $body = "You have received a new message from the contact form on the If These Lands Could Talk website regarding $regarding.\n\n" . "Here are the details:\n\nName: $name\n\nEmail: $email\n\nMessage:\n$message";

    // Send email and handle success or failure
    if (mail($to, $subject, $body, $headers)) {
        header('Location: ' . $successURL);
        exit;
    } else {
        header('Location: ' . $failURL);
        exit;
    }
}
?>
