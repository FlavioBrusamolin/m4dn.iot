<?php
function tensao($data) {
    exec('java -jar cf-client-1.0.0-M3.jar GET coap://['.$data.']:5683/afe?get=vol', $output);
    print_r($output[8]);
    // print_r(12732);
}

if (isset($_POST['callTensao'])) {
    echo tensao($_POST['callTensao']);
}
?>