angular.module('m4dn').controller('topologiaCtrl', function ($scope, /*momotes,*/ ips, $rootScope) {

    var topologia = function () {
        /*var promise = momotes.listar();
        promise.then(function (response) {
            console.table(response.data);
            var quant_momotes = Object.keys(response.data);
            var len_momotes = quant_momotes.length;

            len_momotes_global = len_momotes;
            momotes_global = response.data;

            cadastroIPs(response.data, len_momotes);
            listaIPs();

        });
        promise.catch(function (err) {
            alert('Error creating network topology.');
        });*/

        $.get("/m4dn.iot/coap/devicesConectados.php", function (response) {
            response = JSON.parse(response);
            // console.log(response);

            var quant_momotes = Object.keys(response);
            var len_momotes = quant_momotes.length;

            cadastroIPs(response, len_momotes);
        });
    }

    var cadastroIPs = function (momotes, n_momotes) {
        for (var i = 0; i < n_momotes; i++) {
            var promise = ips.criar(momotes[i].ip);
            promise.then(function (response) {
                // console.log('IP cadastrado');

                listaIPs();

            });
            promise.catch(function (err) {
                console.log('Nao foi possivel cadastrar o IP');
            });
        }

        implementaAvisoIPs();

        // criaGrafo();
    }

    var listaIPs = function () {
        var promise = ips.listar();
        promise.then(function (response) {
            var IPs = Object.keys(response.data);
            var len_IPs = IPs.length;

            desconectaIPs(response.data, len_IPs);

        });
        promise.catch(function (err) {
            console.log('Nao foi possivel trazer os IPs cadastrados');
        });
    }

    var desconectaIPs = function (IPs, n_IPs) {
        for (var k = 0; k < n_IPs; k++) {
            var promise = ips.desconectar(IPs[k].ip);
            promise.then(function (response) {
                // console.log('IPs desconectados');

                conectaIPs(response.data.ip);

            });
            promise.catch(function (err) {
                console.log('Nao foi possivel desconectar os IPs');
            });
        }

        // criaGrafo();
    }

    var conectaIPs = function (deviceIP) {
        var ajax = $.ajax({
            url: '/m4dn.iot/coap/deviceStatus.php',
            type: 'post',
            data: { "callStatus": deviceIP },
            success: function (response) {
                if (response == 0 || response == 1) {
                    var promise = ips.verificar(deviceIP);
                    promise.then(function (response) {
                        // console.log('IPs Conectados');
                    });
                    promise.catch(function (err) {
                        console.log('Nao foi possivel conectar os IPs');
                    });
                }
                else {
                    // console.log(deviceIP + ' esta desconectado ou aberto');
                }
            }
        });

        window.setTimeout(function () {
            ajax.abort();
        }, 1000);
    }

    var implementaAvisoIPs = function () {
        var promise = ips.listar();
        promise.then(function (response) {
            lista_ips = response.data;
            var quant_ips = Object.keys(response.data);
            var len_ips = quant_ips.length;

            for (var j = 0; j < len_ips; j++) {
                var promise = ips.implementarAviso(lista_ips[j].ip);
                promise.then(function (response) {
                    // console.log('Aviso implementado (linha amarela)');
                });
                promise.catch(function (err) {
                    console.log('Nao foi possivel implementar aviso (linha amarela)');
                });
            }
        });
        promise.catch(function (err) {
            console.log('Nao foi possivel trazer os IPs');
        });

        criaGrafo();
    }

    var criaGrafo = function () {
        var promise = ips.listar();
        promise.then(function (response) {
            console.log(response.data);
            lista_momotes = response.data;
            var quant_momotes = Object.keys(response.data);
            var len_momotes = quant_momotes.length;

            var i,
                s,
                N = len_momotes,
                E = len_momotes,
                g = {
                    nodes: [],
                    edges: []
                },
                urls = [
                    'images/gateway2.png',
                    'images/device2.png'
                ];

            var node = {
                id: 'n0',
                label: 'Gateway',
                x: 0,
                y: 0,
                size: 1,
                color: 'rgba(92,180,198,1)',
                type: 'equilateral',
                image: {
                    url: urls[0],
                    scale: 0.9,
                    clip: 0.85
                },
                data: {
                    ip: 'aaaa::212:4b00:60e:1872',
                    protocol: 'Netconf, CoAP'
                }
            }
            if (node.type == 'equilateral') {
                node.equilateral = {
                    rotate: 11,
                    numPoints: 6
                }
            }
            g.nodes.push(node);

            for (i = 0; i < N; i++) {
                var node = {
                    id: 'n' + (i + 1),
                    label: 'Device ' + (i + 1),
                    x: Math.cos(Math.PI * 2 * i / N),
                    y: Math.sin(Math.PI * 2 * i / N),
                    size: 1,
                    color: 'rgba(41,50,65,0.8)',
                    type: 'equilateral',
                    image: {
                        url: urls[1],
                        scale: 0.9,
                        clip: 0.85
                    },
                    data: {
                        ip: lista_momotes[i].ip,
                        protocol: 'Netconf, CoAP',
                        status: lista_momotes[i].status
                    }
                }
                if (node.type == 'equilateral') {
                    node.equilateral = {
                        rotate: 11,
                        numPoints: 6
                    }
                }
                g.nodes.push(node);
            }

            for (i = 0; i < E; i++)
                if (lista_momotes[i].status == 'Conectado') {
                    g.edges.push({
                        id: 'e' + (i + 1),
                        source: 'n0',
                        target: 'n' + (i + 1),
                        size: 6,
                        color: '#01DF3A',
                        type: 'curvedArrow'
                    });
                }
                else if (lista_momotes[i].status == 'Aberto') {
                    g.edges.push({
                        id: 'e' + (i + 1),
                        source: 'n0',
                        target: 'n' + (i + 1),
                        size: 6,
                        color: '#FFBF00',
                        type: 'curvedArrow'
                    });
                }
                else {
                    g.edges.push({
                        id: 'e' + (i + 1),
                        source: 'n0',
                        target: 'n' + (i + 1),
                        size: 6,
                        color: '#FF0000',
                        type: 'curvedArrow'
                    });
                }

            $('#graph-container').remove();
            $('#grafo').html('<div id="graph-container"></div>');

            var settings = {
                maxNodeSize: 28,
                drawLabels: false,
                enableHovering: false
            };

            s = new sigma({
                graph: g,
                renderer: {
                    container: document.getElementById('graph-container'),
                    type: 'canvas'
                },
                settings: settings
            });

            s.cameras[0].goTo({ x: 0, y: 0, angle: 0, ratio: 1.04 });

            s.refresh();

            var config = {
                node: {
                    show: 'hovers',
                    hide: 'hovers',
                    cssClass: 'sigma-tooltip',
                    position: 'top',
                    autoadjust: true,
                    template:
                        '<div class="arrow"></div>' +
                        ' <div class="sigma-tooltip-header">{{label}}</div>' +
                        '  <div class="sigma-tooltip-body">' +
                        '    <table>' +
                        '      <tr><th>IP:</th> <td>{{data.ip}}</td></tr>' +
                        '      <tr><th>Protocol:</th> <td>{{data.protocol}}</td></tr>' +
                        '    </table>' +
                        '  </div>' +
                        '  <div class="sigma-tooltip-footer"><th>Number of connections:</th> {{degree}}</div>',
                    renderer: function (node, template) {
                        node.degree = this.degree(node.id);
                        return Mustache.render(template, node);
                    }
                }
            };

            sigma.plugins.tooltips(s, s.renderers[0], config);

            s.bind('clickNode', function (e) {
                if (e.data.node.label == "Gateway") {
                    alert('There isn`t informations about the Gateway to display.');
                }
                else if (e.data.node.data.status == "Desconectado" || e.data.node.data.status == "Aberto") {
                    alert('This device is disconnected from the network.');
                }
                else {
                    clearInterval(topology);
                    s.cameras[0].goTo({ x: e.data.node['read_cam0:x'], y: e.data.node['read_cam0:y'], ratio: 0.3 });
                    var deviceName = e.data.node.label;
                    deviceIP = e.data.node.data.ip;
                    $scope.label = deviceName;
                    $scope.ip = deviceIP;

                    info = function () {
                        $.ajax({
                            url: '/m4dn.iot/coap/deviceTensao.php',
                            type: 'post',
                            data: { "callTensao": deviceIP },
                            success: function (response) {
                                $scope.tensao = (response / 100);
                                $scope.$apply();
                            }
                        });
                        $.ajax({
                            url: '/m4dn.iot/coap/deviceCorrente.php',
                            type: 'post',
                            data: { "callCorrente": deviceIP },
                            success: function (response) {
                                $scope.corrente = (response / 100);
                                $scope.$apply();
                            }
                        });
                        $.ajax({
                            url: '/m4dn.iot/coap/deviceStatus.php',
                            type: 'post',
                            data: { "callStatus": deviceIP },
                            success: function (response) {
                                if (response == 0) {
                                    $scope.status = 'OFF';
                                }
                                else if (response == 1) {
                                    $scope.status = 'ON';
                                }
                                else {
                                    $scope.status = 'ERROR';
                                }
                                $scope.$apply();
                            }
                        });
                    }
                    info();
                    reqInfo = setInterval(info, 2000);
                    $('#modalDevice').modal('show');
                }
            });
        });
        promise.catch(function (err) {
            alert('Error creating network topology.');
        });
    }

    $scope.close = function () {
        clearInterval(reqInfo);
        topologia();
        topology = setInterval(topologia, 3000);
        $rootScope.reqTopology = topology;
    };

    $scope.$watch('power', function (value) {
        if (value == true) {
            $.ajax({
                url: '/m4dn.iot/coap/deviceOn.php',
                type: 'post',
                data: { "callOn": deviceIP },
                success: function (response) {
                    console.log(response);
                }
            });
        }
        else if (value == false) {
            $.ajax({
                url: '/m4dn.iot/coap/deviceOff.php',
                type: 'post',
                data: { "callOff": deviceIP },
                success: function (response) {
                    console.log(response);
                }
            });
        }
    });

    topologia();
    topology = setInterval(topologia, 3000);
    $rootScope.reqTopology = topology;
});