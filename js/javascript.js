const upperDisplay = document.querySelector(".display-upper");
const lowerDisplay = document.querySelector(".display-lower");
const buttonAc = document.querySelector("#ac");
const buttonBackspace = document.querySelector("#backspace");

const buttonEqual = document.querySelector("#equal");

const allButtons = document.querySelectorAll("button");


// Function to create transition effect when buttons are clicked
function buttonEffect(button) {
    button.classList.add("pressed");
    button.addEventListener("transitionend", () => {
    button.classList.remove("pressed");
    })
}

// Function to parse equation strings
function stringParser(string) {
    let equationArray = [];
    string = string.trim();
    
    while (string.length !== 0) {
        let token = string.match(/[0-9]+|[+]|[-]|[*]|[/]|[%]/);
        string = string.replace(token[0], "");
        array.push(token[0]);
    }
    console.log(equationArray);
}

// Event listerner for all buttons on click
for (let button of allButtons) {
    button.addEventListener("click", () => {
        buttonEffect(button)
        if (button.value) {
            lowerDisplay.textContent = lowerDisplay.textContent.concat(button.value);
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
    lowerDisplay.textContent = lowerDisplay.textContent.slice(0, lowerDisplay.textContent.length - 1);
})

// Event listener for equal button on click
buttonEqual.addEventListener("click", () => {
    stringParser(lowerDisplay.textContent);
})
