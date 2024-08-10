// Configuración de PeerJS
const peer = new Peer({
    host: 'localhost', // Cambia esto si usas un servidor PeerJS externo o público
    port: 9000,
    path: '/'
});

const localVideo = document.getElementById('localVideo');
const remoteVideo = document.getElementById('remoteVideo');
const callButton = document.getElementById('callButton');
const endButton = document.getElementById('endButton');
const remoteIdInput = document.getElementById('remoteIdInput');
const myIdSpan = document.getElementById('my-id');

let localStream;
let currentCall;

// Obtener acceso a la cámara y el micrófono
navigator.mediaDevices.getUserMedia({ video: true, audio: true })
    .then(stream => {
        localVideo.srcObject = stream;
        localStream = stream;
    })
    .catch(error => console.error('Error accediendo a la cámara/micrófono: ', error));

// Al recibir el ID de conexión
peer.on('open', id => {
    myIdSpan.textContent = id;
});

// Responder a una llamada entrante
peer.on('call', call => {
    call.answer(localStream); // Responder con el stream local

    call.on('stream', remoteStream => {
        remoteVideo.srcObject = remoteStream;
    });

    currentCall = call;
});

// Hacer una llamada
callButton.onclick = () => {
    const remoteId = remoteIdInput.value;

    if (remoteId) {
        const call = peer.call(remoteId, localStream);

        call.on('stream', remoteStream => {
            remoteVideo.srcObject = remoteStream;
        });

        currentCall = call;
    } else {
        alert('Por favor, introduce un ID remoto válido.');
    }
};

// Terminar la llamada
endButton.onclick = () => {
    if (currentCall) {
        currentCall.close();
    }
    remoteVideo.srcObject = null;
};

// Manejar la desconexión de la llamada
peer.on('disconnected', () => {
    console.log('Desconectado del servidor PeerJS');
});

peer.on('close', () => {
    console.log('Conexión cerrada');
    remoteVideo.srcObject = null;
});

peer.on('error', err => {
    console.error('Error con PeerJS: ', err);
});
