<html>
  <head>
    <script src="https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js"></script>
    <script src="https://www.gstatic.com/firebasejs/9.0.0/firebase-analytics.js"></script>
    <script src="https://www.gstatic.com/firebasejs/3.6.4/firebase.js"></script>
    <script src="../JS/main.js"></script>
    <script src="../JS/codigo.js"></script>

    <link rel="stylesheet" type="text/css" href="style.css">
    <!-- Imported firebase JS lib for signalling, and Bootstrap for styling -->
    <link href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/css/bootstrap.min.css" rel="stylesheet">
  </head>
  <body onload="showMyFace()">
    <div id="loadApp" class="jumbotron">
      <h1 class="display-3">Welcome to WebRTC.</h1>
      <p class="lead">Start a video chat between you and another peer, communicating in real time through your browser.</p>
    <button onclick="showApp()" class="btn btn-primary btn-lg center-block">Enter Video Room</button>
      <button id="infoButton" class="btn smallButton btn-outline-secondary" onclick="openInfo()"><svg style="width:30px;height:30px" viewBox="0 -1 24 24">
    <path fill="#000000" d="M11,9H13V7H11M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M11,17H13V11H11V17Z" />
</svg><span></span></button>
    </div>
    <div id="infoModal" class="modal">
      <div class="modal-content">
        <span class="close" aria-hidden="true">&times;</span>
        <div class="modal-header">
        <h5 class="modal-title">How does this app work?</h5>
        </div>
        <div class="modal-body">
          <p>This application uses WebRTC APIs to establish real-time communication through your web browser with another peer, who is also connected to the session by having an instance of this app open on their device.<p>
          </div>
      </div>
    </div>
    <div id="main" class="jumbotron align-middle">
    <video id='yourVideo' autoplay muted></video>
    <video id='friendsVideo' autoplay></video>
    <br />
    <button onclick='showFriendsFace()' type='button' class='btn btn-primary btn-lg bg-success'>Start Video Call <span><svg width="30" height="30" viewBox="0 -6 24 24">
  <path d="M17,10.5V7A1,1 0 0,0 16,6H4A1,1 0 0,0 3,7V17A1,1 0 0,0 4,18H16A1,1 0 0,0 17,17V13.5L21,17.5V6.5L17,10.5Z"></path>
</svg></span></button>
    <button onclick='endCall()' type='button' class='btn btn-primary btn-lg bg-danger'>End Call <span> <svg width="20" height="20" viewBox="0 0 24 24">
  <path d="M12,0A12,12 0 0,1 24,12A12,12 0 0,1 12,24A12,12 0 0,1 0,12A12,12 0 0,1 12,0M12,2A10,10 0 0,0 2,12C2,14.4 2.85,16.6 4.26,18.33L18.33,4.26C16.6,2.85 14.4,2 12,2M12,22A10,10 0 0,0 22,12C22,9.6 21.15,7.4 19.74,5.67L5.67,19.74C7.4,21.15 9.6,22 12,22Z"></path>
</svg></span></button>
    </div>
  </body>
</html>
