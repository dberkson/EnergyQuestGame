
function energyQuest (){


	var gameData;

	function resetGameData(){
			for (var i=0; i<25; i++){
				$('#c' + i).html("");
			}

		gameData = {
			energy: 50,
			currentPosition: 0,
			foodPosition: 0
		}

	}
	/* calculates a position 1-25 */
	function randomPosition (exclude){
		var randomNum=Math.floor((Math.random()*25)+1);
		console.log("randomNum" + randomNum);
		console.log("exclude" + exclude);
		if (randomNum!==exclude){
			return randomNum;
		}else{
			//recurse, TODO remove explicit foodposition mention (running low on time)
			gameData.foodPosition=randomPosition(exclude);
		}
	}

	function writeEnergyLevel(){
		$('#energyLevel').html("Current Energy Level: " + gameData.energy);
	}

	function finishGame(){
			 $('#c' + gameData.currentPosition).html("")
			$('#startGame').removeClass('hidden');
			$('#gameWrapper').addClass('hidden');
			resetGameData();
			CurrentGame="";
			$(document).off("keyup");		
	}

	function newCell(newPositionDiff) {
		console.log(newPositionDiff);
        $('#c' + gameData.currentPosition).html("");
        gameData.currentPosition+=newPositionDiff;
		$('#c' + gameData.currentPosition).html("X");

		gameData.energy-=1;
		if (gameData.currentPosition==gameData.foodPosition){
			alert("you found food, +20!!!!");
			gameData.energy+=20;

			//Create new energy
			gameData.foodPosition=randomPosition(gameData.currentPosition);
		}
		writeEnergyLevel();

		if (gameData.energy===0){
			alert("game over, start again");
			finishGame();

		}else if (gameData.energy>=100) {
			alert("You win!");

			finishGame();
		}

	}

	//INIT
	resetGameData();
	//starting position
	gameData.currentPosition=randomPosition();
	$('#c' + gameData.currentPosition).html("X");
	//food position, can't match current position
	gameData.foodPosition=randomPosition(gameData.currentPosition);

	//init Energy Level
	writeEnergyLevel();

	//Start listening for keypresses
	$(document).on("keyup",function(e){
			console.log(e.keyCode);
  	  switch (e.keyCode) {
        case 40:
            console.log('down');
            if (gameData.currentPosition>20){
            	//do nothing, boundary reached
            	console.log("at boundary!")
            }else{
            	newCell(5);
            }
            break;
        case 38:
            console.log('up');
            if (gameData.currentPosition<6){
            	//do nothing, boundary reached
            	console.log("at boundary!")
            }else{
            	newCell(-5);
            }
            break;
        case 37:
            console.log('left');
            if (gameData.currentPosition%5==1){
            	//do nothing, boundary reached
            	console.log("at boundary!")
            }else{
            	newCell(-1);
            }
            break;
        case 39:
            console.log('right');
            if (gameData.currentPosition%5==0){
            	//do nothing, boundary reached
            	console.log("at boundary!")
            }else{
            	newCell(1);
            }
            break;
        case 81:
			finishGame();
        	break;
        default:
            console.log('???');  
            }
	});

	$('#gameWrapper').removeClass('hidden');
	$('#startGame').addClass('hidden');

}