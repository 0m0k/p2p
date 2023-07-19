// Connect to socket.io server
const socket = io();
// Connect to peerjs server
let myPeer = new Peer();
// Keep track of data connection with peer
let peerConnection = null;


// When myPeer connected to peerjs server, join socket.io room
myPeer.on('open', (clientId) => {
  console.log(`myPeer ID is: ${clientId}`);
  console.log(`myPeer requesting to join ${ROOM_ID}`);
  socket.emit('join-room', ROOM_ID, clientId);
});
socket.on('client-added', () => {
  console.log('myPeer successfully joined room');
});
myPeer.on('connection', (connection) => {
  myTurn = 0;
  peerConnection = connection;
  console.log('myPeer established connection from a remote peer');
  // When myPeer successfully connected to new peer
  peerConnection.on('open', () => {
    console.log(`myPeer successfully connected to ${peerConnection.peer}`);
  });

  // When myPeer receives data
  peerConnection.on('data', (coord) => {
    console.log(`myPeer received: ${coord}`);
    let piece = document.getElementById(coord);
    placePiece(piece);
    myTurn = 1;
  });

  // When myPeer closed connection with new peer
  peerConnection.on('close', () => {
    console.log(`myPeer closed connection with ${peerConnection.peer}`);
  });

  // When error
  peerConnection.on('error', (error) => {
    console.log(error);
  });
});
myPeer.on('close', () => {
  console.log('myPeer closed');
  peerConnection.close();
});
myPeer.on('disconnected', () => {
  console.log('myPeer disconnected');
});
// Handle peerjs errors
myPeer.on('error', (error) => {
  console.log(error);
});


// When new client joined room, connect to new client (peer)
socket.on('client-joined', clientId => {
  console.log(`Client connected ${clientId} to my room`);
  connectToPeer(clientId);
});
// Close peer connections when clients leave
socket.on('client-left', clientId => {
  if (peerConnection) peerConnection.close();
  console.log(`Client left ${clientId}`);
});


// Initiate peer to peer connections
let connectToPeer = (peerId) => {
  console.log(`myPeer connecting to ${peerId}...`);
  let connection = myPeer.connect(peerId);

  // When myPeer successfully connected to new peer
  connection.on('open', () => {
    console.log(`myPeer successfully connected to ${peerId}`);
  });

  // When myPeer receives data
  connection.on('data', (coord) => {
    console.log(`myPeer received: ${coord}`);
    let piece = document.getElementById(coord);
    placePiece(piece);
    myTurn = 1;
  });

  // When myPeer closed connection with new peer
  connection.on('close', () => {
    console.log(`myPeer closed connection with ${peerId}`);
  });

  // When error
  connection.on('error', (error) => {
    console.log(error);
  });

  // Keep track of peer connection
  peerConnection = connection;
};