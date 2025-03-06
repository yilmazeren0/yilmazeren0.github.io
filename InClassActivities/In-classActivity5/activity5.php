<!DOCTYPE html>
<html lang="en">
<head>
    <title>Currency Calculation</title>
    <meta name="description" content="CENG 311 Inclass Activity 5" />
</head>
<body>
<?php
$convertedAmount = 0;
if (isset($_GET['fromCurrency']) && isset($_GET['toCurrency'])) {
    $amount = $_GET['amount'];
    $fromCurrency = substr($_GET['fromCurrency'], 1);
    $toCurrency = substr($_GET['toCurrency'], 1);

    $rates = [
        'USD_CAD' => 1.43,
        'USD_EUR' => 0.93,
        'USD_USD' => 1,
        'CAD_USD' => 0.7,
        'CAD_EUR' => 0.65,
        'CAD_CAD' => 1,
        'EUR_USD' => 1.08,
        'EUR_CAD' => 1.54,
        'EUR_EUR' => 1
    ];

    $rateKey = $fromCurrency . '_' . $toCurrency;
    
    $convertedAmount = $amount * $rates[$rateKey];
    

}
?>
    <form action="activity5.php" method="GET">
        <table>
            <tr>
                <td>From:</td>
                <td><input type="text" name="amount"/></td>
                <td>Currency:</td>
                <td>
                    <select name="fromCurrency">
                        <option value="FUSD">USD</option>
                        <option value="FCAD">CAD</option>
                        <option value="FEUR">EUR</option>
                    </select>
                </td>
            </tr>
            <tr>
                <td>To:</td>
                <td>
                    <?php 
                        if($convertedAmount == 0){
                            echo "";
                        }else{
                            echo $convertedAmount;
                        }
                    ?>
                </td>
                <td>Currency:</td>
                <td>
                    <select name="toCurrency">
                        <option value="TUSD">USD</option>
                        <option value="TCAD">CAD</option>
                        <option value="TEUR">EUR</option>
                    </select>
                </td>
            </tr>
            <tr>
                <td colspan="4"><input type="submit" value="Convert"/></td>
            </tr>
        </table>
    </form>
</body>
</html>
