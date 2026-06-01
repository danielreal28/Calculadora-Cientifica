let currentExpression = "";
let shouldResetDisplay = false;

const displayMain = document.getElementById("result");
const displayHistory = document.getElementById("history");

function inputNumber(num) {
    if (displayMain.innerText === "0" || shouldResetDisplay) {
        displayMain.innerText = num;
        shouldResetDisplay = false;
    } else {
        displayMain.innerText += num;
    }
    currentExpression += num;
    triggerVibration();
}

function inputOperator(operator) {
    if (shouldResetDisplay) shouldResetDisplay = false;
    displayMain.innerText += ` ${operator} `;
    currentExpression += operator;
    triggerVibration();
}

function inputSci(type) {
    if (shouldResetDisplay) shouldResetDisplay = false;
    
    if (type === 'pi') {
        displayMain.innerText += "π";
        currentExpression += "Math.PI";
    } else if (type === 'pow') {
        displayMain.innerText += "^";
        currentExpression += "**";
    } else {
        displayMain.innerText += `${type}(`;
        if (type === 'ln') currentExpression += "Math.log(";
        else if (type === 'log') currentExpression += "Math.log10(";
        else currentExpression += `Math.${type}(`;
    }
    triggerVibration();
}

function clearDisplay() {
    displayMain.innerText = "0";
    displayHistory.innerText = "";
    currentExpression = "";
    shouldResetDisplay = false;
    triggerVibration();
}

function backspace() {
    let str = displayMain.innerText;
    if (str.length > 1 && str !== "0") {
        displayMain.innerText = str.slice(0, -1);
        currentExpression = currentExpression.slice(0, -1);
    } else {
        displayMain.innerText = "0";
        currentExpression = "";
    }
    triggerVibration();
}

function calculate() {
    if (!currentExpression) return;
    
    try {
        displayHistory.innerText = displayMain.innerText;
        
        let result = eval(currentExpression);
        
        if (Number(result) === result && result % 1 !== 0) {
            result = parseFloat(result.toFixed(8));
        }
        
        displayMain.innerText = result;
        currentExpression = result.toString();
        shouldResetDisplay = true;
    } catch (error) {
        displayMain.innerText = "Error";
        currentExpression = "";
        shouldResetDisplay = true;
    }
    triggerVibration();
}

function triggerVibration() {
    if (navigator.vibrate) {
        navigator.vibrate(15);
    }
}