// script.js 
// We are going to start our JavaScript with our the questions we are going to plugin later on
let questions = [ 
	{ 
		prompt: `Which one of these is an array?`, 
		options: [ 
			"bar john - 32", 
			"pizza is awesome", 
			"52", 
			"var john = 27" 
		], 
		answer: "var john = 27", 
	}, 

	{ 
		prompt: `What does CSS stand for?`, 
		options: [ 
			"Carrol Simpson Sister", 
			"Carrot Style Shirt", 
			"Cascading Style Sheet", 
			"Cascading Smile ShipS", 
		], 
		answer: "Cascading Style Sheet", 
	}, 

	{ 
		prompt: `What is JavaScript used for`, 
		options: [ 
			"Used to create interactive webpages", 
			"A type of coffee", 
			"A computer brand", 
			"A kind of entree", 
		], 
		answer: "Used to create interactive webpages", 
	}, 

	{ 
		prompt: `What does the DOM stand for?`, 
		options: ["Danger Object Mirror", "Document Object Model", "Dinner On Mat", "Dancing On Mirrors"], 
		answer: "Document Object Model", 
	}, 

	{ 
		prompt: `What is the local storage`, 
		options: [ 
			"Data Storage", 
			"A place for people's stuff", 
			"Where we write our HTML", 
			"Style our webpage", 
		], 
		answer: "Data Storage", 
	}, 
]; 

// here we are grabbing our elements from our HTML 


let questionsEl = 
	document.querySelector( 
		"#questions"
	); 
let timerEl = 
	document.querySelector("#timer"); 
let choicesEl = 
	document.querySelector("#options"); 
let submitBtn = document.querySelector( 
	"#submit-score"
); 
let startBtn = 
	document.querySelector("#start"); 
let nameEl = 
	document.querySelector("#name"); 
let feedbackEl = document.querySelector( 
	"#feedback"
); 
let reStartBtn = 
	document.querySelector("#restart"); 

// Quiz's initial state 
let currentQuestionIndex = 0; 
let time = questions.length * 15; 
let timerId; 

// Here we are starting are quiz and hiding our initial landing page so the questions are visible

function quizStart() { 
	timerId = setInterval( 
		clockTick, 
		1000 
	); 
	timerEl.textContent = time; 
	let landingScreenEl = 
		document.getElementById( 
			"start-screen"
		); 
	landingScreenEl.setAttribute( 
		"class", 
		"hide"
	); 
	questionsEl.removeAttribute( 
		"class"
	); 
	getQuestion(); 
} 

// Loop through array of questions and 
// Answers and create list with buttons 
function getQuestion() { 
	let currentQuestion = 
		questions[currentQuestionIndex]; 
	let promptEl = 
		document.getElementById( 
			"question-words"
		); 
	promptEl.textContent = 
		currentQuestion.prompt; 
	choicesEl.innerHTML = ""; 
	currentQuestion.options.forEach( 
		function (choice, i) { 
			let choiceBtn = 
				document.createElement( 
					"button"
				); 
			choiceBtn.setAttribute( 
				"value", 
				choice 
			); 
			choiceBtn.textContent = 
				i + 1 + ". " + choice; 
			choiceBtn.onclick = 
				questionClick; 
			choicesEl.appendChild( 
				choiceBtn 
			); 
		} 
	); 
} 

// In this function we are checking our answers and making they are correct if not we are going to deduct 15 secconds from the current timer like we stated on the landing page 


function questionClick() { 
	if ( 
		this.value !== 
		questions[currentQuestionIndex] 
			.answer 
	) { 
		time -= 15; 
		if (time < 0) { 
			time = 0; 
		} 
		timerEl.textContent = time; 
		feedbackEl.textContent = `Wrong! The correct answer was 
		${questions[currentQuestionIndex].answer}.`; 
		feedbackEl.style.color = "red"; 
	} else { 
		feedbackEl.textContent = 
			"Correct!"; 
		feedbackEl.style.color = 
			"green"; 
	} 
	feedbackEl.setAttribute( 
		"class", 
		"feedback"
	); 
	setTimeout(function () { 
		feedbackEl.setAttribute( 
			"class", 
			"feedback hide"
		); 
	}, 2000); 
	currentQuestionIndex++; 
	if ( 
		currentQuestionIndex === 
		questions.length 
	) { 
		quizEnd(); 
	} else { 
		getQuestion(); 
	} 
} 

// End quiz by hiding questions, 
// Stop timer and show final score 

function quizEnd() { 
	clearInterval(timerId); 
	let endScreenEl = 
		document.getElementById( 
			"quiz-end"
		); 
	endScreenEl.removeAttribute( 
		"class"
	); 
	let finalScoreEl = 
		document.getElementById( 
			"score-final"
		); 
	finalScoreEl.textContent = time; 
	questionsEl.setAttribute( 
		"class", 
		"hide"
	); 
} 

// This function is checking the timer and making it hits 0 before we could call the quizEnd() function to end the quiz

function clockTick() { 
	time--; 
	timerEl.textContent = time; 
	if (time <= 0) { 
		quizEnd(); 
	} 
} 

// Here we are introducing our local storage and storing the persons name and score
// Along with users' name 

function saveHighscore() { 
	let name = nameEl.value.trim(); 
	if (name !== "") { 
		let highscores = 
			JSON.parse( 
				window.localStorage.getItem( 
					"highscores"
				) 
			) || []; 
		let newScore = { 
			score: time, 
			name: name, 
		}; 
		highscores.push(newScore); 
		window.localStorage.setItem( 
			"highscores", 
			JSON.stringify(highscores) 
		); 
		alert( 
			"Your Score has been Submitted"
		); 
	} 
} 

// Save users' score after pressing enter 

function checkForEnter(event) { 
	if (event.key === "Enter") { 
		saveHighscore(); 
    // this alert is letting the player know that their score was submitted and stored in local storage.
		alert( 
			"Your Score has been Submitted"
		); 
	} 
} 
nameEl.onkeyup = checkForEnter; 

// Save users' score but only after they click the button thats why the "onclick" is added

submitBtn.onclick = saveHighscore; 

// here the same process is being used as the previous line of code 

startBtn.onclick = quizStart;
// highScore.js 

let scoresBtn = document.querySelector( 
	"#view-high-scores"
); 

// IN order to make sure the scores are being submitted properly we are storing them in order by how they are submitted

function printHighscores() { 
	let highscores = 
		JSON.parse( 
			window.localStorage.getItem( 
				"highscores"
			) 
		) || []; 
	highscores.sort(function (a, b) { 
		return b.score - a.score; 
	}); 
	highscores.forEach(function ( 
		score 
	) { 
		let liTag = 
			document.createElement( 
				"li"
			); 
		liTag.textContent = 
			score.name + 
			" - " + 
			score.score; 
		let olEl = 
			document.getElementById( 
				"highscores"
			); 
		olEl.appendChild(liTag); 
	}); 
} 

// Not only is the user going to be able to store their scores but they are also going to have the ability to clear any recent scores 
function clearHighscores() { 
	window.localStorage.removeItem( 
		"highscores"
	); 
	window.location.reload(); 
} 
document.getElementById( 
	"clear"
).onclick = clearHighscores; 

printHighscores();
