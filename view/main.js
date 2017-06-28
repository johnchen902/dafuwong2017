(function() {
const GAMEOVER = 0;
const WAIT_TO_ROLL = 3;
const WAIT_TO_BUY = 4;

var socket = null;
var id = null;
var state = null;

function repaint() {
    $("#change_id").text(id === null ? "Set ID" : "Change ID");
    if(!state)
        return;
    console.log(state);
    $("#dice").toggle(state.code === WAIT_TO_ROLL && state.nowPlaying === id);
}
function disable_control() {
    $("#dice").hide();
}

disable_control();

socket = io(); // connect
socket.on("update", function(newState) {
    state = newState;
    repaint();
});
socket.on("disconnect", function () {
    console.log("disconnected");
    state = null;
    id = null;
    repaint();
    disable_control();
});

$("#change_id").click(function () {
    if(!$("#player_id")[0].checkValidity()) {
        // TODO show error message
        return;
    }
    id = $("#player_id").val() | 0;
    repaint();
});

$("#dice").click(function () {
    socket.emit('roll_dice', id);
    disable_control();
});
})();
