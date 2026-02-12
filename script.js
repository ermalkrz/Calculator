// Basic math functions
const add = function(a, b) {
    return a + b;
};

const subtract = function(a, b) {
    return a - b;
};

const multiply = function(a, b) {
    return a * b;
};

const divide = function(a, b) {
    return a / b;
};

// Operate function that calls the appropriate math function
const operate = function(operator, a, b) {
    a = parseFloat(a);
    b = parseFloat(b);
    
    switch(operator) {
        case '+':
            return add(a, b);
        case '-':
            return subtract(a, b);
        case '*':
            return multiply(a, b);
        case '/':
            return divide(a, b);
        default:
            return null;
    }
};
// Calculator state
let firstNumber = '';
let secondNumber = '';
let currentOperator = null;
let shouldResetDisplay = false;

// DOM elements
const display = document.getElementById('display');
const numberButtons = document.querySelectorAll('.number');
const operatorButtons = document.querySelectorAll('.operator');
const equalsButton = document.getElementById('equals');
const clearButton = document.getElementById('clear');
const decimalButton = document.getElementById('decimal');
const backspaceButton = document.getElementById('backspace');

// Update display
function updateDisplay(value) {
    display.textContent = value;
}

// Round long decimals
function roundResult(number) {
    return Math.round(number * 100000000) / 100000000;
}
// Handle number input
function inputNumber(number) {
    if (display.textContent === '0' || shouldResetDisplay) {
        updateDisplay(number);
        shouldResetDisplay = false;
    } else {
        if (display.textContent.length < 12) {
            updateDisplay(display.textContent + number);
        }
    }
}

// Event listeners for number buttons
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        inputNumber(button.dataset.number);
    });
});

// Handle operator input
function inputOperator(operator) {
    if (currentOperator !== null && !shouldResetDisplay) {
        secondNumber = display.textContent;
        const result = operate(currentOperator, firstNumber, secondNumber);
        updateDisplay(roundResult(result));
        firstNumber = roundResult(result).toString();
    } else {
        firstNumber = display.textContent;
    }
    
    currentOperator = operator;
    shouldResetDisplay = true;
}

// Event listeners for operator buttons
operatorButtons.forEach(button => {
    button.addEventListener('click', () => {
        inputOperator(button.dataset.operator);
    });
});
