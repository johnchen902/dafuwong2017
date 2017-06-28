var socket = io();

function roll_dice() {
    socket.emit('roll_dice');
    return false;
}

socket.on('dice_result', function show_dice_result( res ) {
	player_ID = res.player_id;
	dice_result = res.dice_result;
	$('#diceResult .txtbox h2').text("Player " + player_ID + " got");
	$('#diceResult .txtbox h1').text( dice_result );
	$('#diceResult img').attr( 'src', "./view/img/wifi" + dice_result + ".png" );
	$('#diceResult').show();
	setTimeout( " $('#diceResult').hide(); ", 2000 );
});

socket.on('update', function update( data ) {
	var player = data.player;	
	var rank = data.rank;

	for (var i = 0; i < 5; i++) {

		// update position
		var currPos = '#' + player[i].pos;
		var x = $(currPos).offset().left;
		var y = $(currPos).offset().top;
		$("#player" + i).css('top', y);
		$("#player" + i).css('left', x);

		// update scoreboard
		var j = i;
		$('#info' + (i+1) + ' h4').text(player[j].name);
		$('#info' + (i+1) + ' p').text('$' + player[j].money);

		// update ip


		// update items 

	}
});

function show_question( q ){

	$('#questionBox').show();
	$('#questionBox .qTitle h1').text(q.subject);
	$('#questionBox .qDes p').text(q.description);

	// if( q.multi == true ) {

	// }
	// else {

	// }

}