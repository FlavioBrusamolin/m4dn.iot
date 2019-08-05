<?php
function corrente($data) {
    exec('java -jar cf-client-1.0.0-M3.jar GET coap://['.$data.']:5683/afe?get=cur', $output);
    print_r($output[8]);
    // print_r(67);
}

if (isset($_POST['callCorrente'])) {
    echo corrente($_POST['callCorrente']);
}
?>