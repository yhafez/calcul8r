/* Global Variables */

let heldValue = null;
let heldOperation = null;
let nextValue = null;

/* Click Handler Helper Functions */

function showValue (location, value) {
    if (value === null){
        $(location).text("");
    }
    else {
        $(location).text(Number(value));
    }
}

function updateDisplay () {
    showValue ($('.held-value'), heldValue);
    showValue ($('.next-value'), nextValue);
}

/* Click Handlers to Update Display */

//Updates display when number buttons are pressed
$('.digits button').click(function(event){
    
    if (nextValue === null) {
        nextValue = 0;
        showValue ($('.next-value'), nextValue);
    }
    
    let clickedDigit = $(this).text();
    
    /* If the nuber in the display already contains a decimal point, and the decimal button is clicked again, this  if statement will prevent the display from showing NaN, by stopping the program from adding another decimal to the stored number. */
    if ($('.next-value').text()%1 != 0 && clickedDigit == '.') {
        clickedDigit = ''
        }

    nextValue = nextValue + clickedDigit;
    $('.next-value').text(nextValue);
    updateDisplay();
    
})


$('.clear-all').click(function(){
    heldValue = null;
    heldOperation = null;
    nextValue = null;
    $('.next-operation').text('');
    updateDisplay();
})

$('.clear-entry').click(function(){
    nextValue = null;
    updateDisplay();
})

/* Operations Functions */

function setHeldOperation (operation) {
    if (heldOperation !== null) {
        heldValue = heldOperation(heldValue, nextValue);
    }

    else if (nextValue !== null) {
        heldValue = nextValue;
    }

    nextValue = null;
    heldOperation = operation;
}

function add(x,y) {
    let addTotal = Number(x) + Number(y);
    return addTotal;
}

function subtract(x,y) {
    let subtractTotal = x - y;
    return subtractTotal;
}

function multiply(x,y) {
    let multiplyTotal = x * y;
    return multiplyTotal;
}

function divide(x,y) {
    let divideTotal = x / y;
    return divideTotal;
}

/* Click Handlers for Operation Buttons */

$('.add').click(function(){
    if ($('.next-operation').text() === '+' && nextValue === null) {
        heldValue = Number(heldValue) + Number(heldValue);
        $('.next-operation').text('');
        updateDisplay();
    }

    else if ($('.next-operation').text() === '+' && nextValue !== null) {
        heldValue = Number(heldValue) + Number(nextValue);
        $('.next-operation').text('');
        nextValue = null;
        updateDisplay();
    }

    else {
        setHeldOperation(add);
        $('.next-operation').text('+');
        updateDisplay();
    }
})

$('.subtract').click(function(){
    if ($('.next-operation').text() === '-' && nextValue === null) {
        heldValue = heldValue - heldValue;
        $('.next-operation').text('');
        nextValue = null;
        updateDisplay();
    }

    else if ($('.next-operation').text() === '-' && nextValue !== null) {
        heldValue = heldValue - nextValue;
        $('.next-operation').text('');
        updateDisplay();
    }
    else {
        setHeldOperation(subtract);
        $('.next-operation').text('-');
        updateDisplay();
    }
})

$('.multiply').click(function(){
    
    if ($('.next-operation').text() === 'x' && nextValue === null) {
        heldValue = heldValue * heldValue;
        $('.next-operation').text('');
        updateDisplay();
    }

    else if ($('.next-operation').text() === 'x' && nextValue !== null) {
        heldValue = heldValue * nextValue;
        $('.next-operation').text('');
        nextValue = null;
        updateDisplay();
    }
    
    else {
        setHeldOperation(multiply);
        $('.next-operation').text('x');
        updateDisplay();
    }
})

$('.divide').click(function(){
    if ($('.next-operation').text() === '÷' && nextValue === null) {
        heldValue = heldValue / heldValue;
        $('.next-operation').text('');
        updateDisplay();
    }

    else if ($('.next-operation').text() === '÷' && nextValue !== null) {
        heldValue = heldValue / nextValue;
        $('.next-operation').text('');
        nextValue = null;
        updateDisplay();
    }
    else {
        setHeldOperation(divide);
        $('.next-operation').text('÷');
        updateDisplay();
    }
})

$('.equals').click(function(){
    setHeldOperation(null);
    $('.next-operation').text('');
    updateDisplay();
})