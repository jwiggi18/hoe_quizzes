//modified from https://www.sitepoint.com/simple-javascript-quiz/

(function() {
	function buildQuiz(){
	// place to store the HTML output

		const output = [];

		// for each question...
		myQuestions.forEach((currentQuestion, questionNumber) => {

			//store the list of answer choices

			const answers = [];

			//and for each available answer...
			for(letter in currentQuestion.answers){

				//...add an HTML radio button
				answers.push(

					`<label>

						<input type="radio" name="question${questionNumber}" value="${letter}">

						${letter} :

						${currentQuestion.answers[letter]}

					</label>`

				);
			}

			// add this question and its answers to the output

			output.push(

				`<div class="question"> ${currentQuestion.question} </div>

				<div class="answers"> ${answers.join('')} </div>`
			);
		});

	// combine output list into one string of HTML and put it on the page

		quizContainer.innerHTML = output.join('');
	}


	function showResults(){

		//gather answer containers from our quiz
		const answerContainers = quizContainer.querySelectorAll('.answers');

		//keep track of the user's answers
		let numCorrect = 0;

		//for each question...
		myQuestions.forEach( (currentQuestion, questionNumber) => {

			// find selected answer
			const answerContainer = answerContainers[questionNumber]; //look inside answer container for the current question

			const selector = 'input[name=question'+questionNumber+']:checked'; //define CSS selector that will find which radio button is checked

			const userAnswer = (answerContainer.querySelector(selector) || {}).value; // use js's querySelector to search for CSS selector in the previously defined answerContainer, .value gets the value of the answer, || is an 'or' incase the user leaves the question blank

			//if answer is correct
			if(userAnswer===currentQuestion.correctAnswer){
				//add to the number of correct answers
				numCorrect++;

				//color the answers green
				answerContainers[questionNumber].style.color = 'lightgreen';
							}
							// if answer is wrong or blank
								else {

				//color the answers red
				answerContainers[questionNumber].style.color = 'red';

		}
	});

	//show number of correct answers out of total
	resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
}

	const quizContainer = document.getElementById('quiz');
	const resultsContainer = document.getElementById('results');
	const submitButton = document.getElementById('submit');
	const myQuestions = [
		{
			question: "The 'tail of life on earth' has been unfolding for aobut ______ years",

			answers: {
				a: "4 billion",
				b: "3 million",
				c: "20 thousand"
			},
			correctAnswer: "a"

		},

		{
			question: "The layers of rock composing earth’s surface are called the",

			answers: {
				a: "iridium layer",
				b: "strata",
				c: "basalt"
			},
			correctAnswer: "b"
		}
	];

	// display quiz right away
	buildQuiz();

	// on submit, show results
	submitButton.addEventListener('click', showResults);

})();
