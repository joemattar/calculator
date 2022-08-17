const upperDisplay = document.querySelector(".display-upper");
const lowerDisplay = document.querySelector(".display-lower");
const buttonAc = document.querySelector("#ac");
const buttonBackspace = document.querySelector("#backspace");
const buttonEqual = document.querySelector("#equal");
const allButtons = document.querySelectorAll("button");
const equationRegex = /^\d*[.]?\d+|[.]{1}|[+]|[-]|[*]|[/]|[%]/

// Function to create transition effect when buttons are clicked
function buttonEffect(button) {
    button.classList.add("pressed");
    button.addEventListener("transitionend", () => {
    button.classList.remove("pressed");
    })
}

// Function to create transition effect when buttons are clicked but are invalid
function buttonEffectError(button) {
    button.classList.add("error");
    button.addEventListener("transitionend", () => {
    button.classList.remove("error");
    })
}

// Function backSpace to delete last character from lower display
function backSpace() {
    lowerDisplay.textContent = lowerDisplay.textContent.slice(0, lowerDisplay.textContent.length - 1);
}

// Function to parse equation strings
function equationStringParser(string) {
    let equationArray = [];
    string = string.trim();    
    while (string.length !== 0) {
        let token = string.match(equationRegex);
        string = string.replace(token[0], "");
        equationArray.push(token[0]);
    }
    return equationArray;
}

function resolveEquation(equationArray) {
    // Converts number strings to numbers
    for (let i = 0; i < equationArray.length; i++) {
        if (!isNaN(equationArray[i])) {
            equationArray[i] = + equationArray[i];
        }
    }

    // Check for numbers with two decimals symbols = bad expression
    for (let i = 0; i < equationArray.length - 1; i++) {
        if (typeof equationArray[i] === "number" && typeof equationArray[i+1] === "number") {
            updateUpperDisplay("BAD EXPRESSION - CHECK DECIMALS")
            return
        }
    }

    // Check for division by zero


    // OTHERWISE
    // Start with resolving %
    while (equationArray.includes("%")) {
        let index = equationArray.indexOf("%")
        equationArray[index - 1] /= 100;
        equationArray.splice(index, 1);
    }

    // Then resolve for division
    while (equationArray.includes("/")) {
        let index = equationArray.indexOf("/")
        if (equationArray[index + 1] === "-") {
            equationArray[index - 1] /= - equationArray[index + 2];
            equationArray.splice(index, 3);
        } else if (equationArray[index + 1] === 0) {
            updateUpperDisplay("BAD EXPRESSION - ZERO DIVISION")
            return
        } else {
            equationArray[index - 1] /= equationArray[index + 1];
            equationArray.splice(index, 2);
        }
    }

    // Then resolve for multiplication
    while (equationArray.includes("*")) {
        let index = equationArray.indexOf("*")
        if (equationArray[index + 1] === "-") {
            equationArray[index - 1] *= - equationArray[index + 2];
            equationArray.splice(index, 3);
        } else {
            equationArray[index - 1] *= equationArray[index + 1];
            equationArray.splice(index, 2);
        }
    }

    // Then resolve for substraction
    while (equationArray.includes("-")) {
        let index = equationArray.indexOf("-")
        if (index === 0) {
            equationArray[index + 1] = - equationArray[index + 1];
            equationArray.splice(index, 1);
        } else {
            equationArray[index - 1] -= equationArray[index + 1];
            equationArray.splice(index, 2);
        }
    }

    // Then resolve for addition
    while (equationArray.includes("+")) {
        let index = equationArray.indexOf("+")
        equationArray[index - 1] += equationArray[index + 1];
        equationArray.splice(index, 2);
    }
    updateUpperDisplay(equationArray)
}

// Function to update the upper display
function updateUpperDisplay(string) {
    upperDisplay.textContent = string;
}

// Event listerner for all buttons on click
for (let button of allButtons) {    
    button.addEventListener("click", function typeCharacter() {
        upperDisplay.style.removeProperty("font-size");
        lowerDisplay.style.removeProperty("font-size");
        let lastCharacter = lowerDisplay.textContent.charAt(lowerDisplay.textContent.length - 1);
        
        if (button.value) {
            // ADD OPERATORS RULES
            // Digits Rules
            // Cannot add digit after %
            if (/^[0-9]+/.test(button.value)) {
                if (/[%]/.test(lastCharacter)) {
                    buttonEffectError(button);
                    // pass
                } else {
                    buttonEffect(button);
                    lowerDisplay.textContent = lowerDisplay.textContent.concat(button.value);
                    let equationArray = equationStringParser(lowerDisplay.textContent);
                    resolveEquation(equationArray);
                }
            // Percentage % symbol rules
            // Can add only after digit or another %
            // When after . replaces it        
            } else if (/[%]/.test(button.value)) {
                if (/[0-9]|[%]/.test(lastCharacter)) {
                    buttonEffect(button);
                    lowerDisplay.textContent = lowerDisplay.textContent.concat(button.value);
                    let equationArray = equationStringParser(lowerDisplay.textContent);
                    resolveEquation(equationArray);
                } else if (/[.]/.test(lastCharacter)) {
                    backSpace();
                    typeCharacter();
                } else {
                    buttonEffectError(button)
                    //pass
                }
            // Decimal . symbol rules
            // Cannot add a . after another . or after a %
            } else if (/[.]/.test(button.value)) {
                if (/[.]|[%]/.test(lastCharacter)) {
                    buttonEffectError(button)
                    // pass
                } else {
                    lowerDisplay.textContent = lowerDisplay.textContent.concat(button.value);
                }
            // Minus - symbol rules
            // Cannot add a - after another -
            // When after . or + replaces it
            } else if (/[-]/.test(button.value)) {
                if (lastCharacter === "-") {
                    buttonEffectError(button)
                    // pass
                } else if (/[+]|[.]/.test(lastCharacter)) {
                    backSpace();
                    typeCharacter();
                } else {
                    lowerDisplay.textContent = lowerDisplay.textContent.concat(button.value);
                }
            // + x / symbols rules
            // Cannot add  after same symbol
            // When after . or - replaces it
            // + x / symbols replace + x / symbols if different
            } else if (/^[^0-9]+/.test(button.value)) {
                if (button.value === lastCharacter) {
                    buttonEffectError(button)
                    // pass
                } else if (/[-]|[.]/.test(lastCharacter)) {
                    backSpace();
                    typeCharacter();
                } else if (/[+]|[*]|[/]/.test(lastCharacter) && lastCharacter !== button.value) {
                    backSpace();
                    typeCharacter();
                } else {
                    lowerDisplay.textContent = lowerDisplay.textContent.concat(button.value);
                }
            }    
        }
    })    
}

// Event listener for AC button on click
buttonAc.addEventListener("click", () => {
    upperDisplay.textContent = "";
    lowerDisplay.textContent = "";
})

// Event listener for backspace button on click
buttonBackspace.addEventListener("click", () => {
    backSpace();
    // Parse equation string into an equation array
    let equationArray = equationStringParser(lowerDisplay.textContent);
    resolveEquation(equationArray);
})

// Event listener for equal button on click
buttonEqual.addEventListener("click", () => {
    // IF STRING ENDS WITH . or + or - or * or / then delete last character
    let lastCharacter = lowerDisplay.textContent.charAt(lowerDisplay.textContent.length - 1);
    if (/[.]|[+]|[-]|[*]|[/]/.test(lastCharacter)) {
        backSpace();
    }
    // Parse equation string into an equation array
    let equationArray = equationStringParser(lowerDisplay.textContent);
    resolveEquation(equationArray);

    upperDisplay.style.fontSize = "50px";
    lowerDisplay.style.fontSize = "36px";
    lowerDisplay.textContent = upperDisplay.textContent;
})

// TODO: RESOLVE DISPLAYS WITH LARGE NUMBERS
// TODO: RESOLVE FOR SCIENTIFIC DISPLAY OF NUMBERS