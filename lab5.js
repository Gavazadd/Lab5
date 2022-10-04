const body = document.querySelector('body');
let Valid = 1;
let errorFields = [];
let answers = [];
const answerDiv = document.createElement('div');
const task1 = document.getElementById('task1');

function checkFields(type, text, regex, additionalCheck = () => true) {
    const valueFromElement = document.getElementById(type).value;
    if (regex.test(valueFromElement) && additionalCheck(valueFromElement)) {
        const answer = document.createElement('h4');
        answer.innerHTML = `${text}: ` + valueFromElement;
        answers.push(answer);
    } else {
        Valid *= 0;
        errorFields.push(type);
    }

}

function clearInfo() {
    while (answerDiv.firstChild) answerDiv.removeChild(answerDiv.firstChild);
    if (task1.querySelector('.answerDiv')) task1.removeChild(answerDiv);
    errorFields.forEach(errorField => {
        const field = document.getElementById(errorField);
        field.style.border = '1px gray solid';
    });
    Valid = 1;
    errorFields = [];
    answers = [];
}

function submit() {
    clearInfo();
    checkFields('name', 'ПІБ', /^[A-ZА-Я][a-zA-ZА-Яа-я]+ [A-ZА-Я]\.[A-ZА-Я]\.$/); 
    checkFields('number', 'Телефон', /^\d{3}-\d{3}-\d{2}-\d{2}$/);
    checkFields('idCard', 'ID-card', /^[A-Z]{2} №\d{6}$/);
    checkFields('faculty', 'Факультет', /^[A-ZА-Я][a-zA-ZА-Яа-я]+$/);
    checkFields('birthday', 'Дата народження', /^\d{2}.\d{2}.\d{4}$/);
    if (Valid) {
        answers.forEach(answer => answerDiv.appendChild(answer));
        task1.appendChild(answerDiv);
    } else {
        errorFields.forEach(errorField => {
            const field = document.getElementById(errorField);
            field.style.border = '2px red solid';
        });
    }
}

for (let r = 0; r < 6; r++) {
    const rowElement = document.createElement('tr');
    for (let d = 0; d < 6; d++) {
        const index = String(d + 1 + (r * 6));
        const dataElement = document.createElement('td');
        dataElement.innerHTML = index;
        dataElement.id = index;
        rowElement.appendChild(dataElement);
        body.appendChild(rowElement);
    }
}

const variant = 3;

const element = document.getElementById(String(variant));

element.onmouseover = () => {
    element.style.background = 'rgb(' + Math.floor(Math.random() * 255) + ',' + Math.floor(Math.random() * 255)+ ',' + Math.floor(Math.random() * 255) + ')';
};

function Click(e) {
    e.style.background = document.getElementById('current_color').value;
}

element.onmouseup = () => {
    Click(element);
};

function doubleClick() {
    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 6; j++) {
            if (i == j) {
                const currentElement = document.getElementById(String(i + j * 6 + 1));
                currentElement.style.background = document.getElementById('current_color').value;
            }
        }
    }
    const current_ceil = document.getElementById(String(variant));
    current_ceil.style.background = 'white';
}

element.ondblclick = () => {
    doubleClick();
};