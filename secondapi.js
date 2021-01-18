// Calls to the API to get the list of categories 
function getCategories() {
    fetch('https://opentdb.com/api_category.php')
        .then((response) => response.json())
        .then((data) => selectCategories(data))
}

// Gets the categories' options from the previous API call and adds each category to an option element
function selectCategories(data) {
    let content = document.getElementById('category');
    
    data.trivia_categories.forEach((element) => {
        content.innerHTML += `<option value="${element.id}" id="${element.name}">${element.name}</option>`
    });
}

// Gets the questions when the user clicks on the button, calls the API based on the number of questions, category, level of difficulty, and type of question chosen. 
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

// The function is called in the API call, prints each question available depending on the parameters chosen by the user. Also gets the answers of each question, both correct and incorrect, and the prints them by calling getAnswersHTML().
function printQuestions(info) {
    let content = document.getElementById('questions-container');

    content.innerHTML = '';

    if(info.results.length == 0) {
        content.innerHTML = `<div class="alert alert-danger" role="alert">
            There are not enough questions to match your selections. Please choose different options!
        </div>`
    } else {
        info.results.forEach((element, index) => {
            let cAnswer = element.correct_answer;
            let iAnswers = element.incorrect_answers;
            let allAnswers = iAnswers.concat(cAnswer); 
            console.log(cAnswer);
            // console.log(allAnswers);
    
            let randomAnswers = allAnswers.sort(() => Math.random() - 0.5);
            console.log(randomAnswers);
    
            content.innerHTML += `<div class="col-md-6 mb-4">
                        <div class="card h-100">
                            <div class="card-body">
                                ${element.question}
                                ${getAnswersHTML(randomAnswers, index, cAnswer)}
                            </div>
                        </div>
                    </div>`;
        });
        content.innerHTML += `<div class="d-flex justify-content-center mb-4"><input type="submit" class="btn btn-primary py-2 px-5" value="Submit Answers"></div>`;
    }
}

// Prints the answers for the questions. Checks if the result array that is return from the API call is empty or not. Checks if the current answer inside the loop is the correct one, if it is, it adds 'correct' as its value, if not, it adds 'incorrect' to its value. 
function getAnswersHTML(randomAnswers, index, cAnswer) {

    let result = '';
    for(let i = 0; i < randomAnswers.length; i++) {
        if(randomAnswers[i] === cAnswer) {
            result += `<div class="form-check">
                    <input class="form-check-input" type="radio" name="group${index}" id="${randomAnswers[i]}${index}" value="correct" required>
                    <label class="form-check-label" for="${randomAnswers[i]}${index}">
                        ${randomAnswers[i]}
                    </label>
                    </div>`;
        } else {
            result += `<div class="form-check">
                    <input class="form-check-input" type="radio" name="group${index}" id="${randomAnswers[i]}${index}" value="incorrect" required>
                    <label class="form-check-label" for="${randomAnswers[i]}${index}">
                        ${randomAnswers[i]}
                    </label>
                    </div>`;
        } 
    }
    return result;
}

// Upon form submittion. Gets the value of the selections made by the user. Loops through all the selections and checks if the answer selected is the correct answer, if it is, adds 1 to the counter. 
function validatingAnswers() {
    let counter = 0;
    let length = document.getElementById('questions').value;

    for(let i = 0; i < length; i++) {
        let rigthWrong = document.querySelector(`input[name="group${i}"]:checked`).value;
        if(rigthWrong === "correct") {
            counter += 1;
        }
    }
    printScore(counter, length);
}

// Receives counter and length from validatingAnswers(), adds the innerHTML for the score portion, it uses the counter to keep track of the right answers and length to know the number of questions being asked. 
function printScore(counter, length) {
    let content = document.getElementById('score-container');

    content.innerHTML = `<div class="card border-success mb-3 mt-4 mx-auto" style="max-width: 18rem;">
        <div class="card-body text-success text-center">
        <h5 class="card-title">Your Score: ${counter}/${length}</h5>
        <p class="card-text">Correct answers: ${counter} <br> Wrong answers: ${length - counter} <br> Total answers: ${length}</p>
        </div>
    </div>`
}