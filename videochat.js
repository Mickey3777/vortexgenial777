const localVideo = document.getElementById('localVideo');

const remoteVideo = document.getElementById('remoteVideo');

const generatedIdTextArea = document.getElementById('generatedId');

const connectionIdTextArea = document.getElementById('connectionId');

let localStream;

let remoteStream;

let peerConnection;

const servers = {

    iceServers: [{ urls: "stun:stun.l.google.com:19302" }]

};

// Función para inicializar la cámara y el micrófono

async function startLocalStream() {

    localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });

    localVideo.srcObject = localStream;

}

// Crear conexión de WebRTC y establecer los eventos necesarios

function createPeerConnection() {

    peerConnection = new RTCPeerConnection(servers);

    peerConnection.onicecandidate = (event) => {

        if (event.candidate) {

            console.log('Nueva candidata ICE: ', event.candidate);

            // Enviar al otro peer a través de un servidor de señalización

        }

    };

    peerConnection.ontrack = (event) => {

        if (!remoteStream) {

            remoteStream = new MediaStream();

            remoteVideo.srcObject = remoteStream;

        }

        remoteStream.addTrack(event.track);

    };

    localStream.getTracks().forEach(track => {

        peerConnection.addTrack(track, localStream);

    });

}

// Función para generar un ID (simulado) y crear una oferta SDP

document.getElementById('generateIdBtn').addEventListener('click', async () => {

    await startLocalStream();

    createPeerConnection();

    const offer = await peerConnection.createOffer();

    await peerConnection.setLocalDescription(offer);

    const id = btoa(JSON.stringify(offer));

    generatedIdTextArea.value = id;

});

// Función para conectar utilizando un ID

document.getElementById('connectBtn').addEventListener('click', async () => {

    await startLocalStream();

    createPeerConnection();

    const offer = JSON.parse(atob(connectionIdTextArea.value));

    await peerConnection.setRemoteDescription(offer);

    const answer = await peerConnection.createAnswer();

    await peerConnection.setLocalDescription(answer);

    // Aquí se debería enviar esta respuesta al otro peer (por ejemplo, usando WebSockets)

});

// Evento para manejar la recepción de una respuesta (en un escenario real sería desde un servidor de señalización)

connectionIdTextArea.addEventListener('input', async () => {

    if (peerConnection && peerConnection.signalingState === "have-local-offer") {

        const answer = JSON.parse(atob(connectionIdTextArea.value));

        await peerConnection.setRemoteDescription(answer);

    }

});
