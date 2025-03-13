<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Preview</title>
</head>
<body>
    <h1>Preview</h1>
    <?php
    function getPostValue($key, $default = "Not provided") {
        return isset($_POST[$key]) && !empty($_POST[$key]) ? htmlspecialchars($_POST[$key]) : $default;
    }

    $name = getPostValue('name');
    $uname = getPostValue('username');
    $pass = getPostValue('password');
    $address = getPostValue('address');
    $country = getPostValue('country');
    $zip = getPostValue('zipcode');
    $email = getPostValue('email');
    $sex = getPostValue('sex');
    $about = getPostValue('about');
    $languages = isset($_POST['language']) ? implode(", ", $_POST['language']) : "Not provided";
    ?>

    <p><?php echo $name; ?></p>
    <p><?php echo $uname; ?></p>
    <p><?php echo $pass; ?></p>
    <p>Address: <?php echo $address; ?></p>
    <p><?php echo $country; ?></p>
    <p>Zip: <?php echo $zip; ?></p>
    <p><?php echo $email; ?></p>
    <p><?php echo $sex; ?></p>
    <p><?php echo $languages; ?></p>
    <p><?php echo $about; ?></p>
</body>
</html>
