<?php

// Generate a random number using shell script
$randomNumber = exec("bash ./random.sh");

?>

<!DOCTYPE html>
<html>
<head>
    <title>Random Number Generator</title>
</head>
<body>
    <h1>Random Number: <?php echo $randomNumber; ?></h1>
</body>
</html>
