import React from 'react'
import ReactDom from 'react-dom'
import App from "./components/app";

ReactDom.render(
    <App />,
    document.getElementById('root'),
)

let buttons = document.querySelectorAll('.calculator-button')
let display = document.getElementById('main-display')

let insideOperation = false
let pastValue = null
let selectedOperation = null


function checkNegative() {
    try {
        return parseFloat(display.innerHTML) > 0
    } catch (e) {
        return false
    }
}

function checkDecimal(){
    return display.innerHTML.includes('.')
}

function canBeDisplayed(number) {
    if (number.includes('.')) {
        const brokenNumber = number.split('.')
        return brokenNumber[0].length <= 9
    }

    return number.length <= 9
}

function addDisplayValue(value, overwrite= false, inverseSign=false) {
    let displayValue = display.innerHTML
    if (insideOperation && !inverseSign) {
        overwrite = true
        insideOperation = false
    }

    if (displayValue.length === 9 && !overwrite) {
        return
    }

    if (inverseSign) {
        if (display.innerHTML === '0') {
            return
        }
        if (!checkNegative()) {
            display.innerHTML = displayValue.substring(1)
        } else {
            display.innerHTML = value + displayValue
        }
    }

    else if (overwrite) {
        display.innerHTML = value
    }

    else {
        display.innerHTML = displayValue + value
    }
}

let calculate_press =  (buttonValue) => {
    let display_value = display.innerHTML

    switch (buttonValue) {
        case '0':
            if (display.innerHTML === '0') {
                break
            }

            addDisplayValue(buttonValue)
            break

        case '.':
            if(checkDecimal()) {
                break
            }

            addDisplayValue(buttonValue)
            break


        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':

            if (display_value === '0') {
                addDisplayValue(buttonValue, true)
                break
            }

            addDisplayValue(buttonValue)
            break

        case 'inv':
            addDisplayValue('-', false, true)
            break

        case 'mod':
        case 'div':
        case 'mul':
        case 'sub':
        case 'add':
            pastValue = display.innerHTML
            selectedOperation = buttonValue
            insideOperation = true
            break

        case '=':
            try {
                switch (selectedOperation) {
                    case 'mod':
                        display.innerHTML = (parseFloat(pastValue) % parseFloat(display_value)).toString().substr(0, 9)
                        break
                    case 'div':
                        const div_result = (parseFloat(pastValue) / parseFloat(display_value)).toString()

                        if (canBeDisplayed(div_result)) {
                            display.innerHTML = div_result.substr(0, 9)
                        } else{
                            display.innerHTML = 'Error'
                        }
                        break
                    case 'mul':
                        const mul_result = (parseFloat(pastValue) * parseFloat(display_value)).toString()

                        if (canBeDisplayed(mul_result)) {
                            display.innerHTML = mul_result.substr(0, 9)
                        } else{
                            display.innerHTML = 'Error'
                        }

                        break
                    case 'sub':
                        const sub_result = (parseFloat(pastValue) - parseFloat(display_value)).toString()
                        if (canBeDisplayed(sub_result)) {
                            display.innerHTML = sub_result.substr(0, 9)
                        } else{
                            display.innerHTML = 'Error'
                        }

                        break
                    case 'add':
                        const result = (parseFloat(pastValue) + parseFloat(display_value)).toString()
                        if (canBeDisplayed(result)) {
                            display.innerHTML = result.substr(0, 9)
                        } else{
                            display.innerHTML = 'Error'
                        }
                        break
                    default:
                        break
                }

                selectedOperation = null
                pastValue = null
            } catch (e) {
                display.innerHTML = 'Error'
            }

            break

        case 'c':
            insideOperation = false
            pastValue = null
            selectedOperation = null
            display.innerHTML = '0'
            break

    }
}


for(let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", () => calculate_press(buttons[i].value))
}
