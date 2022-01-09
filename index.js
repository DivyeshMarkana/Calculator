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
        // pure function
        const resultString = createResultString(key, displayValue, calculator.dataset)

        // Update states
        updateCalculatorState(key, calculator, resultString, displayValue)
        updateVisualSate(key, calculator)

    }
})

const getKeyType = (key) => {
    const { action } = key.dataset

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
            previousKeyType !== "calculate"
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

const updateCalculatorState = (key, calculator, calculatedValue, displayValue) => {
    const keyType = getKeyType(key)
    const {
        firstValue,
        modValue,
        operator,
        previousKeyType
    } = calculator.dataset

    calculator.dataset.previousKeyType = keyType

    if (keyType === "operator") {
        key.classList.add("is-depressed")

        calculator.dataset.operator = key.dataset.action
        calculator.dataset.firstValue = firstValue &&
            operator &&
            previousKeyType !== "operator" &&
            previousKeyType !== "calculate"
            ? calculatedValue
            : displayValue
    }

    if (keyType === 'clear') {
        if (key.textContent === 'AC') {
            calculator.dataset.firstValue = ''
            calculator.dataset.modValue = ''
            calculator.dataset.operator = ''
            calculator.dataset.previousKeyType = ''
        } else {
            key.textContent = 'AC'
        }
    }

    if (keyType !== 'clear') {
        const clearButton = calculator.querySelector('[data-action=clear]')
        clearButton.textContent = 'CE'
    }

    if (keyType === "calculate") {
        calculator.dataset.modValue = firstValue && previousKeyType === "calculate"
            ? modValue
            : displayValue
    }
}

const updateVisualSate = (key, calculator) => {
    const keyType = getKeyType(key)


    Array.from(key.parentNode.children)
        .forEach(k => k.classList.remove('is-depressed'))

    if (keyType === "operator") {
        key.classList.add("is-drepressed")
    }

    if (keyType === "clear" && key.textContent !== "AC") {
        key.textContent = "AC"
    }

    if (keyType !== 'clear') {
        const clearButton = calculator.querySelector('[data-action=clear]')
        clearButton.textContent = 'CE'
    }


}

