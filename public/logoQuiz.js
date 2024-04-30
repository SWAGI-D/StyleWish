const logos = ["Adidas",
				"Nike",
				"Champion",
				"Chanel",
				"Prada",
				"Louis Vuitton",
				"GAP",
				"Gucci",
				"Tommy Hilfiger",
				"Balenciaga"
			];

let score = 0;

function checkAnswer(logoNumber) {
	let answerID = "user-answer" + logoNumber;
	let userAnswer = document.getElementById(answerID).value;

	if(userAnswer.toLowerCase() === logos[logoNumber - 1].toLowerCase())
	{
		document.getElementById(answerID).value = logos[logoNumber-1];
		document.getElementById(answerID).style.backgroundColor = 'green';
		document.getElementById(answerID).style.color = 'white';
		document.getElementById(answerID).disabled = true;
		score+= 1;
	}

	updateScore();
}

function giveUp() {
	document.getElementById("reset-btn").disabled = false;
	document.getElementById("give-up-btn").disabled = true;
	for(let i = 1; i <= 10; i++) {
		let currentAnswer = document.getElementById("user-answer" + i);
		if(currentAnswer.style.backgroundColor != 'green') {
			currentAnswer.value = logos[i - 1];
			currentAnswer.style.backgroundColor = 'red';
			currentAnswer.style.color = 'white';
			currentAnswer.disabled = true;
		}
	}
}

function reset() {
	document.getElementById("reset-btn").disabled = true;
	document.getElementById("give-up-btn").disabled = false;
	for(let i = 1; i <= 10; i++) {
		let answerID = "user-answer" + i;
		let currentAnswer = document.getElementById(answerID);
		currentAnswer.value = "";
		currentAnswer.style.backgroundColor = 'white';
		currentAnswer.style.color = 'black';
		currentAnswer.disabled = false;
	}
	score = 0;
	updateScore();
}

function updateScore() {
	if(score > 10)
		score = 10;
	document.getElementById("score").innerHTML = score;
}

