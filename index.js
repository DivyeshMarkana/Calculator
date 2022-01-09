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

const getKeyType = (key) => {
    const { action } =key.dataset

    if (!action) {
        return "number"
    }

    if (action === "add" ||
    action === "subtract" ||
    action === "multiply" ||
    action === "divide") {
        return "operator"
    }
    // for everything else return action
    return action
}

const createResultString = (key, displayValue, state) => {

    const keyType = getKeyType(key)
    const keyContent = key.textContent
    const {
        firstValue,
        modValue,
        operator,
        previousKeyType
    } = state   

    if (keyType === "number") {
        return (displayValue === "0" ||
            previousKeyType === "operator" ||
            previousKeyType === "calculate")
            ? keyContent
            : displayValue + keyContent
    }

    if (keyType === "decimal") {
        if (!displayValue.includes("."))
            return displayValue + "."

        if (previousKeyType === "operator" || previousKeyType === "calculate")
            return "0."

        return displayValue

    }

    if (keyType === "operator") {

        const firstValue = calculator.dataset.firstValue
        const operator = calculator.dataset.operator

        return firstValue &&
            operator &&
            previousKeyType !== "operator" &&
            previousKeyType === "calculate"
            ? calculate(firstValue, operator, secondValue)
            : displayValue
    }

    if (keyType === "clear") {
        return 0
    }

    if (keyType === "calculate") {
        return firstValue
            ? (previousKeyType === "calculate")
                ? calculate(displayValue, operator, modValue)
                : calculate(firstValue, operator, displayValue)
            : displayValue
    }

}

const updateCalculatorState = (key) => {
    const keyType = getKeyType(key)
}



Array.from(key.parentNode.children)
    .forEach(k => k.classList.remove('is-depressed'))






if (action !== "clear") {
    const clearButton = calculator.querySelector("[data-action=clear]")
    clearButton.textContent = "CE"
}
