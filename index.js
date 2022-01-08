const calculator = document.querySelector(".calculator")
const display = document.querySelector(".calculator__display")
const keys = document.querySelector(".calculator__keys")

const calculate = (n1, operator, n2) => {
    let result = ""

    if (operator === "add") {
        result = n1 + n2
    }
    else if (operator === "subtract") {
        result = n1 - n2
    }
    else if (operator === "multiply") {
        result = n1 * n2
    }
    else if (operator === "divide") {
        result = n1 / n2
    }
    return result
}


keys.addEventListener("click", e => {
    if (e.target.matches("button")) {
        const key = e.target
        const action = key.dataset.action
        const keyContent = key.textContent
        const displayValue = display.textContent

        // Remove .is-depressed class from all keys
        Array.from(key.parentNode.children)
            .forEach(k => k.classList.remove('is-depressed'))


        const previousKeyType = calculator.dataset.previousKeyType

        // replace displayValue 0 to user presees key
        // if previous Key is an operator we replace display value with presses key
        if (!action) {
            if (displayValue === "0" || previousKeyType === "operator") {
                display.textContent = keyContent
            }
            else {
                display.textContent = displayValue + keyContent
            }
        }

        // add decimal key and concatenate with display value
        if (action === "decimal") {
            display.textContent = displayValue + "."
        }

        if (action === "add" || action === "subtract" || action === "mutiply" || action === "divide") {

            key.classList.add("is-depressed")
            calculator.dataset.previousKeyType = "operator"
            calculator.dataset.firstValue = displayValue
            calculator.dataset.operator = action
        }

        if (action === "calculate") {
            const firstValue = calculator.dataset.firstValue
            const operator = calculator.dataset.operator
            const secondValue = displayValue

            display.textContent = calculate(firstValue, operator, secondValue)
        }
    }
})