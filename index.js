const calculator = document.querySelector(".calculator")
const display = document.querySelector(".calculator__display")
const keys = document.querySelector(".calculator__keys")

keys.addEventListener("click", e => {
    if (e.target.matches("button")) {
        const key = e.target
        const action = key.dataset.action
        const keyContent = key.textContent
        const displayValue = display.textContent

        // replace displayValue 0 to user presees key
        if (!action) {
            if (displayValue === "0") {
                display.textContent = keyContent
            }
            else {
                display.textContent = displayValue + keyContent
            }
        }

        if (action === "decimal") {
            display.textContent = displayValue + "."
        }
    }
})