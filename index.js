const calculator = document.querySelector(".calculator")
const display = document.querySelector(".calculator__display")
const keys = document.querySelector(".calculator__keys")

keys.addEventListener("click", e => {
    if (e.target.matches("button")) {
        const key = e.target
        const action = key.dataset.action
        const keyContent = key.textContent
        const displayValue = display.textContent

         // Remove .is-depressed class from all keys
    Array.from(key.parentNode.children)
    .forEach(k => k.classList.remove('is-depressed'))

        // replace displayValue 0 to user presees key
        if (!action) {
            if (displayValue === "0") {
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
        }
    }
})