var isGame = false;
var timerId;

function startGame() {
	isGame = true;
	var timer = document.getElementsByClassName('timer')[0];
	var time = 59;
	timerId = setInterval(function() {
	  	timer.innerHTML = "00:" + time--;
	  	if (isGame === true && openCardNames.length === 12) {
	  		isGame = false;
	  		stopGame();
	  	}
	}, 1000);

	
	setTimeout(function() {
	  	clearInterval(timerId);  	
	  	stopGame();
	}, 60000);
}

function stopGame() {
	clearInterval(timerId);
	var enclosure = document.getElementsByClassName('enclosure')[0];
	enclosure.style.visibility = "visible";
	if (isGame === true) {
		message_text = 'Lose';
		message_button = 'Try again';
	} else {
		message_text = 'Win';
		message_button = 'Play again';
	}
  	enclosure.querySelector('.enclosure__message-text').innerHTML = message_text;
  	enclosure.querySelector('.enclosure__message-button').innerHTML = message_button;
}

function restartGame() {
	var timer = document.getElementsByClassName('timer')[0].innerHTML = "00.00";
	var enclosure = document.getElementsByClassName('enclosure')[0];
	enclosure.style.visibility = "hidden";
	boxes = document.getElementsByClassName('box');
	for (var i = 0; i < 12; i++) {
		closeCard(boxes[i]);
	}
	countOperations = 0;
	stackCards = [];
	isFail = false;
	openCardNames = [];
	generateGame();
	isGame = false;
}

function clickOnBox(e) {
	let element = e.currentTarget;
	
	if (!isGame) {
		startGame();
	}
	for (var i = 0; i < openCardNames.length; i++) {
		if (element.querySelector('.box__content-front').id === openCardNames[i]) {
			return;
		}
	}
	cardCloseOpen(element);
	kek(element);
}

function closeCard(element) {
	if (element.className === "box") {
        if(element.style.transform == "rotateY(180deg)") {
            element.style.transform = "rotateY(0deg)";
            element.querySelector('.box__content-front').style.visibility = "hidden";
            element.querySelector('.box__content-back').style.visibility = "hidden"; 
            element.querySelector('.box__content-back').style.backgroundColor = "white";      
        }
    }
}

function cardCloseOpen(element) {
	if (element.className === "box") {
        if(element.style.transform == "rotateY(180deg)") {
            element.style.transform = "rotateY(0deg)";
            element.querySelector('.box__content-front').style.visibility = "hidden";
            element.querySelector('.box__content-back').style.visibility = "hidden";
            element.querySelector('.box__content-back').style.backgroundColor = "white";
            
        }
        else {
            element.style.transform = "rotateY(180deg)";
            element.querySelector('.box__content-front').style.visibility = "visible";
            element.querySelector('.box__content-back').style.visibility = "visible";
        }
    }
}

var countOperations = 0;
var stackCards = [];
var isFail = false;
var openCardNames = [];

function kek(element) {
	stackCards.push(element);
	openCardNames.push(element.querySelector('.box__content-front').id);
	if (isFail) {
		for (var i = 0; i < stackCards.length; i++) {
			cardCloseOpen(stackCards.shift());
		}
		openCardNames.splice(openCardNames.length - 3, 2);
		isFail = false;
	}

	if (stackCards.length < 2) {
		return;
	}

	var card1 = stackCards[0].querySelector('.box__content-front');
	var card2 = stackCards[1].querySelector('.box__content-front');
	if (card1.innerHTML === card2.innerHTML) {
		stackCards[0].querySelector('.box__content-back').style.backgroundColor = "green";
		stackCards[1].querySelector('.box__content-back').style.backgroundColor = "green";
		//openCardNames.push(card1.id);
		//openCardNames.push(card2.id);
		stackCards = [];
	} else {
		stackCards[0].querySelector('.box__content-back').style.backgroundColor = "red";
		stackCards[1].querySelector('.box__content-back').style.backgroundColor = "red";
		isFail = true;
	}
}

function generateGame() {
	var box = [1,2,3,4,5,6,7,8,9,10,11,12];
	var emoji = '🐶 🐱 🐭 🐹 🐰 🐻 🐼 🐨 🐯 🦁 🐮 🐷 🐸 🐙 🐵 🦄 🐞 🦀 🐟 🐊 🐓 🦃';
	emoji = emoji.split(' ');
	for (let i = 0; i < 6; i++) {
		var index_emoji = Math.round(Math.random() * (emoji.length - 1));
		for (let j = 0; j < 2; j++) {
			var index_box = Math.round(Math.random() * (box.length - 1));
			document.getElementById('box-'+box[index_box]).innerHTML = emoji[index_emoji];
			//document.getElementById('box-'+box[index_box]).setAttribute('data-value',emoji[index_emoji]);
			box.splice(index_box, 1);
		}
		emoji.splice(index_emoji, 1);
	}
}


generateGame();