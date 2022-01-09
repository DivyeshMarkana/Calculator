const calculator = document.querySelector(".calculator")
const display = document.querySelector(".calculator__display")
const keys = document.querySelector(".calculator__keys")


// creates a calculate function for calculates value
const calculate = (n1, operator, n2) => {

    const firstNum = parseFloat(n1)
    const secondtNum = parseFloat(n2)

    if (operator === "add") {
        return firstNum + secondtNum
    }
    else if (operator === "subtract") {
        return firstNum - secondtNum
    }
    else if (operator === "multiply") {
        return firstNum * secondtNum
    }
    else if (operator === "divide") {
        return firstNum / secondtNum
    }

    return result
}

keys.addEventListener("click", e => {
    if (e.target.matches("button")) {
        const key = e.target
        const displayValue = display.textContent
        const resultString = createResultString(key, displayValue, calculator.dataset)

    }
})

const createResultString = (key, displayValue, state) => {

    if (!action) {
        return (displayValue === "0" ||
            previousKeyType === "operator" ||
            previousKeyType === "calculate")
            ? keyValue
            : displayValue + keyContent
    }

    if (action === "decimal") {
        if (!displayValue.includes("."))
            return displayValue + "."

        if (previousKeyType === "operator" || previousKeyType === "calculate")
            return "0."

        return displayValue

    }
    

    if (action === "add" ||
        action === "subtract" ||
        action === "multiply" ||
        action === "divide") {

        const firstValue = calculator.dataset.firstValue
        const operator = calculator.dataset.operator

        return firstValue &&
            operator &&
            previousKeyType !== "operator" &&
            previousKeyType === "calculate"
            ? calculate(firstValue, operator, secondValue)
            : displayValue
    }

}




// replace displayValue 0 to user presees key
// if previous Key is an operator we replace display value with presses key


// add decimal key and concatenate with display value



// Remove .is-depressed class from all keys
Array.from(key.parentNode.children)
    .forEach(k => k.classList.remove('is-depressed'))


if (action === "calculate") {
    let firstValue = calculator.dataset.firstValue
    const operator = calculator.dataset.operator
    let secondValue = displayValue

    if (firstValue) {
        if (previousKeyType === "calculate") {
            firstValue = displayValue
            secondValue = calculator.dataset.modValue
        }
        display.textContent = calculate(firstValue, operator, secondValue)
    }
    calculator.dataset.modValue = secondValue
    calculator.dataset.previousKeyType = "calculate"
}

if (action === "clear") {
    if (key.textContent === "AC") {
        calculator.dataset.firstValue = ""
        calculator.dataset.operator = ""
        calculator.dataset.modValue = ""
        calculator.dataset.previousKeyType = ""
    }
    else {
        key.textContent = "AC"
    }

    display.textContent = 0
    calculator.dataset.previousKeyType = "clear"
}

if (action !== "clear") {
    const clearButton = calculator.querySelector("[data-action=clear]")
    clearButton.textContent = "CE"
}
