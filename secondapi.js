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

    info.results.forEach((element) => {
        content.innerHTML += `<div class="col-md-4 mb-4">
                        <div class="card h-100">
                            <div class="card-body">
                                ${element.question}
                            </div>
                        </div>
                    </div>`
    });
}

// https://opentdb.com/api.php?amount=10&category=12&difficulty=medium&type=boolean

// questions: 10;
// category: music;
// difficulty: medium;
// type: true/false;