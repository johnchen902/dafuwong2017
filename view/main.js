(function() {
    const GAMEOVER = 0;
    const WAIT_TO_ROLL = 3;
    const WAIT_TO_BUY = 4;

    var socket = null;
    var id = null;
    var state = null;

    function repaint() {
        if(!state)
            return;
        $("#state").text(JSON.stringify(state, null, 4));
        $("#dice-box").toggle(state.code === WAIT_TO_ROLL &&
                              state.nowPlaying === id);
    }
    function disable_control() {
        $("#dice-box").hide();
    }

    disable_control();

    socket = io(); // connect
    socket.on("update", function(newState) {
        state = newState;
        repaint();
    });

    $("#login-button").click(function () {
        if(!$("#login-id")[0].checkValidity()) {
            // TODO show error message
            return;
        }
        id = $("#login-id").val() | 0;
        $("#login-box").hide();
        repaint();
    });

    $("#dice").click(function () {
        socket.emit('roll_dice', id);
        disable_control();
    });
})();
