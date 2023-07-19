let player = 0;
let myTurn = 1;
let spaceAvail = 1;

// Create grid and pieces
const grid = document.getElementById('grid');

// 19x19
for (let i = 0; i < 21; i++) {

  // Row
  let row = document.createElement('tr');
  grid.appendChild(row);

  for (let j = 0; j < 21; j++) {

    // Space
    let space = document.createElement('td');
    space.classList.add('space');
    row.appendChild(space);

    if (i < 20 && j < 20) {
      // Pieces
      let piece = document.createElement('td');
      piece.id = `${i}.${j}`;
      piece.classList.add('piece');

      // Pieve style on hover
      piece.style.border = 'solid red';

      // Piece onclick
      piece.addEventListener('click', function() {
        if (myTurn === 1) {
          placePiece(this);
          if (spaceAvail === 1) {
            peerConnection.send(`${this.id}`);
            console.log(`myPeer sent ${this.id}`);
            myTurn = 0;
          }
        } else {
          alert('Please wait for the other player to place their piece');
        }
      });

      space.appendChild(piece);

      if (i == 0 || j == 0) {
        space.style.visibility = 'hidden';
        piece.style.visibility = 'visible';
      }
    }

    if (i == 20 || j == 20) {
      space.style.visibility = 'hidden';
    }
  }
}

let button = document.getElementById('fullscreen');
button.innerHTML = 'Fullscreen';

function toggleFullscreen() {
  let elem = document.documentElement;
  if (button.innerHTML == 'Fullscreen') {
    button.innerHTML = 'Exit';
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) { /* Safari */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE11 */
      elem.msRequestFullscreen();
    }

  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) { /* Safari */
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { /* IE11 */
      document.msExitFullscreen();
    }
    button.innerHTML = 'Fullscreen';
  }
}

function placePiece(piece) {
  // If position already selected
  if (piece.style.opacity == '1') {
    alert('Please select another position.');
    spaceAvail = 0;
  } else {
    spaceAvail = 1;
    // Piece color
    if (player == 0) {
      piece.style.backgroundColor = 'black';
      piece.style.border = 'solid black';
      player = 1;
    } else {
      piece.style.backgroundColor = 'white';
      piece.style.border = 'solid white';
      player = 0;
    }
    piece.style.opacity = '1';
  }
}