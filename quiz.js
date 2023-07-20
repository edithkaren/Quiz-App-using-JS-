const questions = [
    {
        question: "What is the correct command to create a new React project?",
        answers: [
            { text: "npm create-react-app myReactApp", correct: false},
            { text: "npx create-react-app", correct: false},
            { text: "npm create-react-app", correct: false},
            { text: "npx create-react-app myReactApp", correct: true},
        ]
    },
    {
        question: "What command is used to start the React local development server?",
        answers: [
            { text: "npm start", correct: true},
            { text: "npm serve", correct: false},
            { text: "npm build", correct: false},
            { text: "npm run dev", correct: false},
        ]
    },
    {
        question: "Which keyword creates a constant in JavaScript?",
        answers: [
            { text: "constant  ", correct: false},
            { text: "const", correct: true},
            { text: "let", correct: false},
            { text: "var", correct: false},
        ]
    },
    {
        question: "Which operator can be used to conditionally render a React component?",
        answers: [
            { text: "&&", correct: true},
            { text: "??", correct: false},
            { text: "::", correct: false},
            { text: "||", correct: false},
        ]
    },
    {
        question: "What tool does React use to compile JSX?",
        answers: [
            { text: "Babel", correct: true},
            { text: "ReactDOM", correct: false},
            { text: "React Router", correct: false},
            { text: "JSX Compiler", correct: false},
        ]
    }
    
  


];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0; 
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }
    else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = "You scored " + score + " out of " + questions.length;
    if(score < 5){
        nextButton.innerHTML = "Better luck next time";
    } else {
        nextButton.innerHTML = "Congratulations!";
    }
    nextButton.style.display = "block";
    nextButton.addEventListener("click", startQuiz); // add event listener for "Play Again" button
}


function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }
    else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }
    else{
        startQuiz();
    }
});


startQuiz();

