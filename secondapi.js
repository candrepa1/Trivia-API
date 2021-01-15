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

    info.results.forEach((element, index) => {
        let cAnswer = element.correct_answer;
        let iAnswers = element.incorrect_answers;
        let allAnswers = iAnswers.concat(cAnswer); 
        console.log(cAnswer);
        // console.log(allAnswers);

        let randomAnswers = allAnswers.sort(() => Math.random() - 0.5);
        console.log(randomAnswers);

        content.innerHTML += `<div class="col-md-4 mb-4">
                    <div class="card h-100">
                        <div class="card-body">
                            ${element.question}
                            ${getAnswersHTML(randomAnswers, index, cAnswer)}
                        </div>
                    </div>
                </div>`;
    });
    content.innerHTML += `<input type="submit" class="btn btn-primary mb-3 mw-90" value="Submit Answers">`;
}

function getAnswersHTML(randomAnswers, index, cAnswer) {

    let result = '';
    for(let i = 0; i < randomAnswers.length; i++) {
        if(randomAnswers[i] === cAnswer) {
            result += `<div class="form-check">
                    <input class="form-check-input" type="radio" name="group${index}" id="${randomAnswers[i]}" value="correct" required>
                    <label class="form-check-label" for="${randomAnswers[i]}">
                        ${randomAnswers[i]}
                    </label>
                    </div>`;
        } else {
            result += `<div class="form-check">
                    <input class="form-check-input" type="radio" name="group${index}" id="${randomAnswers[i]}" value="incorrect" required>
                    <label class="form-check-label" for="${randomAnswers[i]}">
                        ${randomAnswers[i]}
                    </label>
                    </div>`;
        } 
    }
    return result;
}

function validatingAnswers() {
    let counter = 0;
    let length = document.getElementById('questions').value;

    for(let i = 0; i < length; i++) {
        let rigthWrong = document.querySelector(`input[name="group${i}"]:checked`).value;
        if(rigthWrong === "correct") {
            counter += 1;
        }
    }
    printScore(counter);
}

function printScore(counter) {
    let content = document.getElementById('score-container');
    let numberQ = document.getElementById('questions').value;

    content.innerHTML = `<div class="card border-success mb-3 mx-auto" style="max-width: 18rem;">
        <div class="card-body text-success">
        <h5 class="card-title">Your Score: ${counter}/${numberQ}</h5>
        <p class="card-text">Correct answers: ${counter} <br> Wrong answers: ${numberQ - counter} <br> Total answers: ${numberQ}</p>
        </div>
    </div>`
}