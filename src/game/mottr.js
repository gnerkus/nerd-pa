// Reference to the websocker server
// Named with uppercase because it is assigned a value just once. 'const'
// cannot be used here because the assignment happens later
let IO = null;
// Reference to the client
let GAME_SOCKET = null;

const playerNames = [
  'purple',
  'deep purple',
  'blue',
  'teal',
];

const playerColours = [
  'player-one',
  'player-two',
  'player-three',
  'player-four',
];

// A list of all games on the server.
// TODO: This should be persisted in a database
const GAMES = {};

function disconnected() {

}

function newWord(newWordMsg) {
  const socketID = this.id;
  const player = GAMES[newWordMsg.gameID].players[socketID];

  player.score += 1;
  // TODO: replace this with the Levesion distance score

  const newWordInfo = {
    players: GAMES[newWordMsg.gameID].players,
    word: newWordMsg.word,
  };

  // Send the new word to all players.
  IO.emit('new word', newWordInfo);
}

function createPlayer(gameID, socketID) {
  const CHOICE = Math.floor(Math.random() * playerNames.length);

  const username = GAMES[gameID].names.splice(CHOICE, 1)[0];
  const colour = GAMES[gameID].colours.splice(CHOICE, 1)[0];

  const playerInfo = {
    gameID,
    socketID,
    username,
    colour,
    score: 0,
    state: 'inactive',
    minUsers: 2,
  };

  GAMES[gameID].players[socketID] = playerInfo;

  return {
    game: GAMES[gameID],
    playerID: socketID,
  };
}

function hostCreateNewGame() {
  // Create a unique socket.io room
  const gameID = (Math.random() * 10000) | 0;

  GAMES[gameID] = {
    gameID,
    players: {},
    names: playerNames,
    colours: playerColours,
    minUsers: 2,
    state: 'inactive',
  };

  // Join the room and wait for the players
  this.join(gameID.toString());

  // Return the room ID and socket ID to the client
  IO.emit('newGameCreated', createPlayer(gameID, this.id));
}

function playerJoinGame(gameInfo) {
  const CLIENT = this;

  // TODO: Figure out how to find rooms in Socket.io
  // Join the room
  CLIENT.join(gameInfo.id);

  // Emit an event notifying the clients that the player has joined the room.
  IO.sockets.in(gameInfo.id).emit('playerJoinedRoom', createPlayer(gameInfo.id, CLIENT.id));
}

/**
 * This function is called by 'server.js' to initialize a new game.
 * @param  {Object} sio    The socket server
 * @param  {Object} socket The connected client
 */
function initGame(sio, socket) {
  IO = sio;
  GAME_SOCKET = socket;
  GAME_SOCKET.emit('connected', { message: 'You are connected' });

  const EVENTS = {
    newGame: 'hostCreateNewGame',
    joinGame: 'playerJoinGame',
    disconnect: 'disconnect',
    newWord: 'new word',
  };

  // Host Events
  GAME_SOCKET.on(EVENTS.newGame, hostCreateNewGame);
  GAME_SOCKET.on(EVENTS.joinGame, playerJoinGame);
  GAME_SOCKET.on(EVENTS.disconnect, disconnected);
  GAME_SOCKET.on(EVENTS.newWord, newWord);
}

export default {
  initGame,
};
