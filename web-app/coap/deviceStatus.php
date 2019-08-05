<?php
function status($data) {
    exec('java -jar cf-client-1.0.0-M3.jar GET coap://['.$data.']:5683/lum/trc', $output);
    print_r($output[8]);
    // print_r(1);
}

if (isset($_POST['callStatus'])) {
    echo status($_POST['callStatus']);
}
?>