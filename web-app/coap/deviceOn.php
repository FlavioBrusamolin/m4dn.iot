<?php
function on($data) {
    exec('java -jar cf-client-1.0.0-M3.jar POST coap://['.$data.']:5683/lum/trc val=on 2>&1', $output);
    // print_r('Ligou: '.$data);
}

if (isset($_POST['callOn'])) {
    echo on($_POST['callOn']);
}
?>