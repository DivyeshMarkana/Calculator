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
}




// replace displayValue 0 to user presees key
// if previous Key is an operator we replace display value with presses key


// add decimal key and concatenate with display value
if (action === "decimal") {
    if (!displayValue.includes(".")) {
        display.textContent = displayValue + "."
    }
    else if (previousKeyType === "operator" || previousKeyType === "calculate") {
        display.textContent = "0."
    }

    calculator.dataset.previousKeyType = "decimal"

}

if (action === "add" || action === "subtract" || action === "multiply" || action === "divide") {

    const firstValue = calculator.dataset.firstValue
    const operator = calculator.dataset.operator
    const secondValue = displayValue
    const previousKeyType = calculator.dataset.previousKeyType

    if (firstValue && operator && previousKeyType !== "operator" || previousKeyType === "calculate") {
        const calcValue = calculate(firstValue, operator, secondValue)
        display.textContent = calcValue

        // update calculated value as first value
        calculator.dataset.firstValue = calcValue
    }
    else {
        // if there no calculation set display value as first Value
        calculator.dataset.firstValue = displayValue
    }

    key.classList.add("is-depressed")
    calculator.dataset.previousKeyType = "operator"
    calculator.dataset.firstValue = displayValue
    calculator.dataset.operator = action
}
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
