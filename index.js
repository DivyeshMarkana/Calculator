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
    const keyContent = key.textContent
    const { action } = key.dataset
    const {
        firstValue,
        modValue,
        operator,
        previousKeyType
    } = state   

    if (!action) {
        return (displayValue === "0" ||
            previousKeyType === "operator" ||
            previousKeyType === "calculate")
            ? keyContent
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

    if (action === "clear") {
        return 0
    }

    if (action === "calculate") {
        const firstValue = calculator.dataset.firstValue
        const operator = calculator.dataset.operator
        const modValue = calculator.dataset.modValue

        return firstValue
            ? (previousKeyType === "calculate")
                ? calculate(displayValue, operator, modValue)
                : calculate(firstValue, operator, displayValue)
            : displayValue
    }

}



Array.from(key.parentNode.children)
    .forEach(k => k.classList.remove('is-depressed'))






if (action !== "clear") {
    const clearButton = calculator.querySelector("[data-action=clear]")
    clearButton.textContent = "CE"
}
