var mqtt = require('mqtt');
var client  = mqtt.connect('mqtt://127.0.0.1',{
    username: "DzV8P2RnMtmW9KMF0z2A"//token
})

client.on('connect', function () {
    console.log('connected');
    client.subscribe('v1/devices/me/rpc/request/+')
});

client.on('message', function (topic, message) {
    console.log('request.topic: ' + topic);
    console.log('request.body.method: ' + message.method.toString());
    var requestId = topic.slice('v1/devices/me/rpc/request/'.length);
    //client acts as an echo service

    // Le message.method est la méthode que le serveur envoie
    // Le message.params est le paramètre que le serveur envoie (quand il veut set une variable sur l'app)

    if (message.method.toString() === 'getIntensity') {
        // Get intensity: le serveur veut connaitre l'intensité de la lumiere de lapp, on renvoit intensité = 99
        client.publish('v1/devices/me/rpc/response/' + requestId, 99); 
    } else if (message.method.toString() === 'getStatus') {
        // Get status: le serveur veut connaitre le statut de la lumiere de lapp, on renvoit le statut = True ou False pour allumé ou éteint
        client.publish('v1/devices/me/rpc/response/' + requestId, True); 
    } else if (message.method.toString() === 'setIntensity') {
        // Set intensity, le serveur envoie la valeur de intensity, directement dans message.params: message: {'method': 'setIntensity', 'params': 98}
        console.log('setIntensity: ' + message.params.toString());
    } else if (message.method.toString() === 'setStatus') {
        // Set status, le serveur envoie la valeur de status, directement dans message.params: message: {'method': 'setStatus', 'params': False}
        console.log('setStatus' + message.params.toString());
    }
});