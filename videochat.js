navigator.mediaDevices.getUserMedia({ video: true, audio: true })
    .then((stream) => {
        // Use the stream for local video
        document.getElementById('localVideo').srcObject = stream;
    })
    .catch((error) => {
        console.error('Error accessing media devices:', error);
    });

let peerConnection = new RTCPeerConnection();

// Add local stream to the peer connection
stream.getTracks().forEach(track => peerConnection.addTrack(track, stream));

// Create an offer
peerConnection.createOffer()
    .then((offer) => peerConnection.setLocalDescription(offer))
    .then(() => {
        // Send the offer to the other peer
    })
    .catch((error) => console.error('Error creating offer:', error));

// On the other side, handle the offer and create an answer
// Then set the remote description of the peer connection

let dataChannel = peerConnection.createDataChannel('myDataChannel');

dataChannel.onopen = (event) => {
    // Data channel is open
};

dataChannel.onmessage = (event) => {
    // Handle received data
};

peerConnection.onicecandidate = (event) => {
    if (event.candidate) {
        // Send the ICE candidate to the other peer
    }
};

peerConnection.ontrack = (event) => {
    document.getElementById('remoteVideo').srcObject = event.streams[0];
};
 Estos son sólo ejemplos básicos y las 

