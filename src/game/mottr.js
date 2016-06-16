// Reference to the websocker server
// Named with uppercase because it is assigned a value just once. 'const'
// cannot be used here because the assignment happens later
let IO = null;
// Reference to the client
let GAME_SOCKET = null;

/**
 * This function is called by 'server.js' to initialize a new game.
 * @param  {Object} sio    The socket server
 * @param  {Object} socket The connected client
 */
function initGame (sio, socket) {
  IO = sio;
  GAME_SOCKET = socket;
  GAME_SOCKET.emit('connected', { message: 'You are connected' });

  // Host Events
  GAME_SOCKET.on('hostCreateNewGame', hostCreateNewGame);
  GAME_SOCKET.on('disconnect', disconnected);
  GAME_SOCKET.on('new word', newWord);
}

function disconnected () {
  console.log('A user disconnected');
}

function newWord (word) {
  console.log('A user has submitted a new word.', word);
  // Send the new word to all players.
  this.emit('new word', word);
}

function hostCreateNewGame () {
  // Create a unique socket.io room
  const gameID = (Math.random() * 10000) | 0;

  // Return the room ID and socket ID to the client
  this.emit('newGameCreated', {
    gameID: gameID,
    socketID: this.id
  });

  // Join the room and wait for the players
  this.join(gameID.toString());
}

export default {
  initGame: initGame
}
