const upperDisplay = document.querySelector(".display-upper");
const lowerDisplay = document.querySelector(".display-lower");
const buttonAc = document.querySelector("#ac");
const buttonBackspace = document.querySelector("#backspace");

const buttonPercent = document.querySelector("#percent");
const buttonDivision = document.querySelector("#division");
const buttonSeven = document.querySelector("#seven");
const buttonEight = document.querySelector("#eight");
const buttonNine = document.querySelector("#nine");
const buttonMultiplication = document.querySelector("#multiplication");
const buttonFour = document.querySelector("#four");
const buttonFive = document.querySelector("#five");
const buttonSix = document.querySelector("#six");
const buttonSubstraction = document.querySelector("#substraction");
const buttonOne = document.querySelector("#one");
const buttonTwo = document.querySelector("#two");
const buttonThree = document.querySelector("#three");
const buttonAddition = document.querySelector("#addition");
const buttonDecimal = document.querySelector("#decimal");
const buttonZero = document.querySelector("#zero");
const buttonTripleZero = document.querySelector("#triple-zero");
const buttonEqual = document.querySelector("#equal");

const allButtons = document.querySelectorAll("button");


// Function to create transition effect when buttons are clicked
function buttonEffect(button) {
    button.classList.add("pressed");
    button.addEventListener("transitionend", () => {
    button.classList.remove("pressed");
    })
}

// Event listerner for all buttons on click
for (let button of allButtons) {
    button.addEventListener("click", () => {
        buttonEffect(button)
        if (button.value) {
            lowerDisplay.textContent = lowerDisplay.textContent.concat(button.value);
        }
    }
    )    
}

// Event listener for AC button on click

// Event listener for backspace button on click
buttonBackspace.addEventListener("click", () => {
    lowerDisplay.textContent = lowerDisplay.textContent.slice(0, lowerDisplay.textContent.length - 1)
})