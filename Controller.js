var N_PLAYER = 5;

/* Define game state. */
const GAMEOVER = 0;
const WAIT_TO_ROLL = 3;
const WAIT_TO_BUY = 4;

function start_controller(io) {
	var io = io;
	var state = {
        code: WAIT_TO_ROLL,
        nowPlaying: 0,
    };
    var players = [];

    function publish() {
        players.forEach(p => p.emit("update", state));
    }

    io.on("connection", function(player) {
        players.push(player);
        player.on("disconnect", function () {
            players.splice(players.indexOf(player), 1)
        });
        player.on("roll_dice", function(id) {
            if(id == state.nowPlaying) {
                state.nowPlaying = (state.nowPlaying + 1) % N_PLAYER;
            }
            publish();
        });
        player.emit("update", state)
    });
}

module.exports = start_controller;
