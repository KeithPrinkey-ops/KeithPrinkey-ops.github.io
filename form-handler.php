<?php
// Check if the form is submitted
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Initialize error message variable
    $errorMessage = '';

    // Retrieve form data and perform validation/sanitization
    $name = trim($_POST['name']);
    $email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
    $reason = trim($_POST['reason']);
    $service = $_POST['service'];
    $consent = isset($_POST['consent']) ? true : false;

    // Perform form validation
    if (empty($name)) {
        $errorMessage = 'Name is required.';
    } elseif (empty($email)) {
        $errorMessage = 'Email is required.';
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errorMessage = 'Invalid email format.';
    } elseif (empty($reason)) {
        $errorMessage = 'Reason for contact is required.';
    } elseif (!$consent) {
        $errorMessage = 'You must consent to be contacted.';
    }

    // Process the form if there are no errors
    if (empty($errorMessage)) {
        // Establish a database connection
        $servername = 'server.worldesports.app';
        $username = 'userAdministrator';
        $password = '143Keithnicci';
        $dbname = 'portfolio';

        // Create a new database connection
        $conn = new mysqli($servername, $username, $password, $dbname);

        // Check the connection
        if ($conn->connect_error) {
            die('Connection failed: ' . $conn->connect_error);
        }

        // Prepare the SQL statement
        $sql = 'INSERT INTO contact (name, email, reason, service, consent) VALUES (?, ?, ?, ?, ?)';

        // Create a prepared statement
        $stmt = $conn->prepare($sql);

        // Bind the form data to the prepared statement
        $stmt->bind_param('sssss', $name, $email, $reason, $service, $consent);

        // Execute the prepared statement
        if ($stmt->execute()) {
            // Insertion successful
            // Redirect back to the form page with a success query parameter
            header('Location: contact.html?success=true');
            exit();
        } else {
            // Insertion failed
            // Redirect back to the form page with an error query parameter
            header('Location: contact.html?error=' . urlencode('Error submitting the form. Please try again.'));
            exit();
        }

        // Close the prepared statement
        $stmt->close();

        // Close the database connection
        $conn->close();
    } else {
        // Redirect back to the form page with an error query parameter
        header('Location: contact.html?error=' . urlencode($errorMessage));
        exit();
    }
}
?>
