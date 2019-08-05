<?php
exec('java -jar cf-client-1.0.0-M3.jar GET coap://[aaaa::212:4b00:60e:1872]:5683/Neighbors/all', $output);

for ($i = 9; ; $i++) {
    if($output[$i] == '') {
        break;
    }
    else {
        $ipCorreto = substr_replace($output[$i], 'aaaa', 0, 4);
        $arrayjson[$i - 9] = array(
            'ip' => $ipCorreto 
        );
    }
}

echo json_encode($arrayjson);

/*--------------------------------------------------------SIMULAÇÃO-----------------------------------------------------------------*/

/*$output = array('fe80::212:4b00:802:3704', 'fe80::212:4b00:802:3799', 'fe80::212:4b00:802:3885', 'fe80::212:4b00:802:3889', 'fe80::212:4b00:802:3884', '', 'fe80::212:4b00:802:3886');

for ($i = 0; ; $i++) {
    if($output[$i] == '') {
        break;
    }
    else {
        $ipCorreto = substr_replace($output[$i], 'aaaa', 0, 4);
        $arrayjson[$i] = array(
            'ip' => $ipCorreto 
        );
    }
}

echo json_encode($arrayjson);*/
?>