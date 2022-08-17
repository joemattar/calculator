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
function stringParser(string) {
    let equationArray = [];
    string = string.trim();    
    while (string.length !== 0) {
        let token = string.match(equationRegex);
        string = string.replace(token[0], "");
        equationArray.push(token[0]);
    }
    // TO REPLACE WITH WHAT TO RETURN
    // NEW FUNCTION ?
    // IF ARRAY ENDS WITH . or + or - or * or / POP()
    // ERROR IF TWO . IN A DIGIT SEQUENCE
    console.log(equationArray);
}

// Event listerner for all buttons on click
for (let button of allButtons) {    
    button.addEventListener("click", function typeCharacter() {
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
                }
            // Percentage % symbol rules
            // Can add only after digit or another %
            // When after . replaces it        
            } else if (/[%]/.test(button.value)) {
                if (/[0-9]|[%]/.test(lastCharacter)) {
                    buttonEffect(button);
                    lowerDisplay.textContent = lowerDisplay.textContent.concat(button.value);
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
})

// Event listener for equal button on click
buttonEqual.addEventListener("click", () => {
    stringParser(lowerDisplay.textContent);
})
