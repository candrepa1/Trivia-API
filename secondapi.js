function getCategories() {
    fetch('https://opentdb.com/api_category.php')
        .then((response) => response.json())
        .then((data) => selectCategories(data))
}

function selectCategories(data) {
    let content = document.getElementById('category');
    
    data.trivia_categories.forEach((element) => {
        content.innerHTML += `<option value="${element.id}" id="${element.name}">${element.name}</option>`
    });
}

function getQuestions() {
    let numberOfQuestions = document.getElementById('questions').value;
    let categorySelected = document.getElementById('category').value;
    let levelOfDifficulty = document.getElementById('difficulty').value;
    let typeOfQuestion = document.getElementById('type').value;

    let url = `https://opentdb.com/api.php?amount=${numberOfQuestions}&category=${categorySelected}&difficulty=${levelOfDifficulty}&type=${typeOfQuestion}`;

    fetch(`${url}`)
        .then((response) => response.json())
        .then((info) => printQuestions(info))
}

function printQuestions(info) {
    let content = document.getElementById('questions-container');

    content.innerHTML = '';

    info.results.forEach((element) => {
        let cAnswer = element.correct_answer;
        let iAnswers = element.incorrect_answers;
        let allAnswers = iAnswers.concat(cAnswer); 
        console.log(cAnswer);
        console.log(allAnswers);

        content.innerHTML += `<div class="col-md-4 mb-4">
                    <div class="card h-100">
                        <div class="card-body">
                            ${element.question}
                            ${getAnswersHTML(allAnswers)}
                        </div>
                    </div>
                </div>`
    });
    content.innerHTML += `<button type="submit" class="btn btn-primary mb-3" onclick="">Submit Answers</button>`;
}

function getAnswersHTML(answers) {
    let randomAnswers = answers.sort(() => Math.random() - 0.5);
    console.log(randomAnswers);

    // let name = document.getElementById('randomAnswers');

    let result = '';
    for(let i = 0; i < randomAnswers.length; i++) {
        result += `<div class="form-check">
                    <input class="form-check-input" type="radio" name="radio" id="${randomAnswers[i]}" value="${randomAnswers[i]}" required>
                    <label class="form-check-label" for="${randomAnswers[i]}">
                        ${randomAnswers[i]}
                    </label>
                    </div>`;
    }

    return result;
}

function allRequired(randomAnswers) {
    for(let i = 0; i < randomAnswers.length; i++) {
        document.getElementById(`${randomAnswers[i]}`).required = true;
    }
}

// https://opentdb.com/api.php?amount=10&category=12&difficulty=medium&type=boolean

// questions: 10;
// category: music;
// difficulty: medium;
// type: true/false;