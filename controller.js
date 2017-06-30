var N_PLAYER = 5;

/* Define game state. */
const GAMEOVER = 0;
const WAIT_TO_ROLL = 3;
const WAIT_TO_BUY = 4;

function new_state() {
    function new_player(pos) {
        return {
            position: pos,
            money: 9487,
            items: [0, 0, 0],
        };
    }
    function new_place(type, next) {
        return {
            building: null,
            type: type,
            next: next,
        };
    }
    return {
        code: WAIT_TO_ROLL,
        nowPlaying: 0,
        players: [
            new_player('t0'),
            new_player('t1'),
            new_player('t2'),
            new_player('t3'),
            new_player('t4'),
        ],
        places: {
            'switch': new_place('switch',  ['s31']),
            't0'    : new_place('home',    ['c01', 's03']),
            's01'   : new_place('nothing', ['switch']),
            's02'   : new_place('nothing', ['s01']),
            's03'   : new_place('nothing', ['s02']),
            'c01'   : new_place('nothing', ['c02']),
            'c02'   : new_place('nothing', ['c03']),
            'c03'   : new_place('dhcp',    ['c04']),
            'c04'   : new_place('nothing', ['c05']),
            'c05'   : new_place('nothing', ['t1']),
            't1'    : new_place('home',    ['c11']),
            'c11'   : new_place('nothing', ['c12']),
            'c12'   : new_place('nothing', ['c13']),
            'c13'   : new_place('nothing', ['c14']),
            'c14'   : new_place('nothing', ['c15']),
            'c15'   : new_place('nothing', ['t2']),
            't2'    : new_place('home',    ['c21', 's23']),
            's21'   : new_place('nothing', ['switch']),
            's22'   : new_place('nothing', ['s21']),
            's23'   : new_place('nothing', ['s22']),
            'c21'   : new_place('nothing', ['c22']),
            'c22'   : new_place('nothing', ['c23']),
            'c23'   : new_place('nothing', ['c24']),
            'c24'   : new_place('nothing', ['c25']),
            'c25'   : new_place('nothing', ['t3']),
            't3'    : new_place('home',    ['c31']),
            's31'   : new_place('nothing', ['s32']),
            's32'   : new_place('nothing', ['s33']),
            's33'   : new_place('nothing', ['t3']),
            'c31'   : new_place('nothing', ['c32']),
            'c32'   : new_place('nothing', ['c33']),
            'c33'   : new_place('dhcp',    ['c34']),
            'c34'   : new_place('nothing', ['c35']),
            'c35'   : new_place('nothing', ['t4']),
            't4'    : new_place('home',    ['c41']),
            'c41'   : new_place('nothing', ['c42']),
            'c42'   : new_place('nothing', ['c43']),
            'c43'   : new_place('nothing', ['c44']),
            'c44'   : new_place('nothing', ['c45']),
            'c45'   : new_place('nothing', ['t0']),
        },
    };
}

module.exports = function (io) {
    var state = new_state();
    var players = [];

    function publish() {
        players.forEach(p => p.emit("update", state));
    }
    function advance(player, n) {
        while(n-- > 0) {
            var place = state.places[player.position];
            player.position = place.next[0];
            place.next.push(place.next.splice(0, 1));
        }
    }

    io.on("connection", function(player) {
        players.push(player);
        player.on("disconnect", function () {
            players.splice(players.indexOf(player), 1)
        });
        player.on("roll_dice", function(id) {
            if(id == state.nowPlaying) {
                var moves = Math.floor(Math.random() * 4) + 1;
                advance(state.players[state.nowPlaying], moves);
                state.nowPlaying = (state.nowPlaying + 1) % N_PLAYER;
            }
            publish();
        });
        player.emit("update", state)
    });
}
