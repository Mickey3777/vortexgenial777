// Steps -
// 1. Display MediaStream of yourself on your PC - peer 2 also does this on theirs
// 2. Create a Peer Connection
// 3. Create an offer (SDP) and add it to your PeerConnection
// 4. Send the offer to peer 2's computer, and add it to their PeerConnection
// 5. Generate ICE candidates and send to peer 2
// 6. Add ICE candidates to peer 2's computer
// 7. Peer 2 creates answer object and sends it to peer 1
// 8. Peer 1 adds answer to PeerConnection
// 9. Peer 2 generates ICE candidates and sends them to Peer 1
// 10. Establish media connection, displaying MediaStream(s) on each other's computers
// Configuration for connection to the Firebase signalling server
var firebaseConfig = {
    apiKey: "AIzaSyC7f6kc1wpnX7d9hIeVVqG_0axzY9doZv4",
      authDomain: "webrtc-video-calling.firebaseapp.com",
      databaseURL: "https://webrtc-video-calling.firebaseio.com",
      projectId: "webrtc-video-calling",
      storageBucket: "webrtc-video-calling.appspot.com",
      messagingSenderId: "871624622760"
  };
  firebase.initializeApp(firebaseConfig);
  // Get access to the root of the Firebase database (Firebase allows real time data changes, so all connected peers see changes instantly. Such as google docs)
  var database = firebase.database().ref();
  var yourVideo = document.getElementById("yourVideo");
  var friendsVideo = document.getElementById("friendsVideo");
  // Random ID assigned to users. This is important because when Offer, Answer and ICE candidate objects are sent
  // This is important because these are delivered by Firebase to yourself and your friend
  // Therefore, the message will be ignored if it sent by yourself (your ID)
  var yourId = Math.floor(Math.random()*1000000000);
  // Declare what STUN/TURN servers will be used. It's good to add more than one STUN server
  // Because if one doesn't work, then WebRTC will automatically try the next server.
  var servers = {'iceServers': [{'urls': 'stun:stun.services.mozilla.com'}, {'urls': 'stun:stun.l.google.com:19302'}, {'urls': 'turn:numb.viagenie.ca','credential': 'root123','username': 'matthew.sayer1@gmail.com'}]};
  var pc = new RTCPeerConnection(servers);
  // Waits for an ICE candidate to be created on your computer
  // When an ICE candidate is created, this function turns the JSON object into a String
  // Then it sends the String to Peer 2 via the Firebase signalling server
  // This will be reciprocated by Peer 2. All ICE candidates sent one at a time.
  pc.onicecandidate = (event => event.candidate?sendMessage(yourId, JSON.stringify({'ice': event.candidate})):console.log("Sent All Ice") );
  // Waits for waits for all the objects to be sent (Offer, Answer and ICE Candidates)
  // After this, the peer 2's media stream (video) will be available, and yours will be available to peer 2
  // Onaddstream is called, and friend's video is added to the remote video stream
  pc.onaddstream = (event => friendsVideo.srcObject = event.stream);
  // Sends Offer object to peer 2.
  function sendMessage(senderId, data) {
      var msg = database.push({ sender: senderId, message: data });
      msg.remove();
  }
  // Makes the video chat client appear and starts video feed
  function showApp() {
    showMyFace();
    document.getElementById("main").style.display = "block";
    document.getElementById("loadApp").style.display = "none";
  }
  // Is used by peer 2 to read the offer message
  function readMessage(data) {
    // Converts received ICE candidate String back into a JSON object
      var msg = JSON.parse(data.val().message);
      var sender = data.val().sender;
      // If the sender is not yourself, then read the Firebase message
      if (sender != yourId) {
          if (msg.ice != undefined)
          // Adds the ICE candidate to the Peer Connection
          // Peer 2 then adds ICE candidates that they have received using this function as well
              pc.addIceCandidate(new RTCIceCandidate(msg.ice));
          else if (msg.sdp.type == "offer")
          // Once offer object is read, peer 2 calls this
          // It sets the offer object to their remote description
          // Then, an answer object is created which the other peer will set their local description to
          // It is then sent back using sendMessage
              pc.setRemoteDescription(new RTCSessionDescription(msg.sdp))
                .then(() => pc.createAnswer())
                // Several ICE candidates will be created at this stage, so pc.onicecandidate will be called
                // once for each ICE candidate created
                .then(answer => pc.setLocalDescription(answer))
                .then(() => sendMessage(yourId, JSON.stringify({'sdp': pc.localDescription})));
          else if (msg.sdp.type == "answer")
              pc.setRemoteDescription(new RTCSessionDescription(msg.sdp));
      }
  };
  // Allows us to add something to the Firebase database using the sendMessage function
  database.on('child_added', readMessage);
  // Called when the HTML page loads, gets the video stream from the local device webcam
  // Calling getUserMedia prompts the browser to ask your permission to access webcam/microphone
  function showMyFace() {
    navigator.mediaDevices.getUserMedia({audio:true, video:true})
    // Once the browser has permission, it will get your webcam/mic stream and put it into your video section
    // Both peers do this
      .then(stream => yourVideo.srcObject = stream)
      .then(stream => pc.addStream(stream));
  }
  // Called when clicking the Call button on the HTML page, displays remote video stream from peer 2
  // pc.createOffer creates an Offer object, and sets your local description to this offer.
  // This offer object is sent to Peer 2 by calling sendMessage.
  function showFriendsFace() {
    pc.createOffer()
      .then(offer => pc.setLocalDescription(offer) )
      .then(() => sendMessage(yourId, JSON.stringify({'sdp': pc.localDescription})) );
  }
  
  function endCall() {
    pc.close();
    window.location.reload(true);
  }
  
  function openInfo() {
    var modal = document.getElementById('infoModal');
    var btn = document.getElementById('infoButton');
    var span = document.getElementsByClassName("close")[0];
    modal.style.display = "block";
    span.onclick = function () {
      modal.style.display = "none";
    }
    window.onclick = function(event) {
      if(event.target == modal) {
        modal.style.display = "none";
      }
    }
  }
