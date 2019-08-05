<?php
function off($data) {
    exec('java -jar cf-client-1.0.0-M3.jar POST coap://['.$data.']:5683/lum/trc val=off 2>&1', $output);
    // print_r('Desligou: '.$data);
}

if (isset($_POST['callOff'])) {
    echo off($_POST['callOff']);
}
?>