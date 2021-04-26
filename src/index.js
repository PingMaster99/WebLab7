import React from 'react'
import ReactDom from 'react-dom'
import App from './components/app'

ReactDom.render(
  <App />,
  document.getElementById('root'),
)

const buttons = document.querySelectorAll('.calculator-button')
const display = document.getElementById('main-display')

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

function checkDecimal() {
  return display.innerHTML.includes('.')
}

function canBeDisplayed(number) {
  if (number.includes('.')) {
    const brokenNumber = number.split('.')
    return brokenNumber[0].length <= 9
  }

  return number.length <= 9
}

function addDisplayValue(value, overwrite = false, inverseSign = false) {
  const displayValue = display.innerHTML
  let forceOverwrite = false
  if (insideOperation && !inverseSign) {
    forceOverwrite = true
    insideOperation = false
  }

  if (displayValue.length === 9 && !overwrite && !forceOverwrite) {
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
  } else if (overwrite || forceOverwrite) {
    display.innerHTML = value
  } else {
    display.innerHTML = displayValue + value
  }
}

const calculatePress = (buttonValue) => {
  const displayValue = display.innerHTML

  switch (buttonValue) {
    case '0':
      if (display.innerHTML === '0') {
        break
      }

      addDisplayValue(buttonValue)
      break

    case '.':
      if (checkDecimal()) {
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

      if (displayValue === '0') {
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
          case 'mod': {
            display.innerHTML = (parseFloat(pastValue)
                  % parseFloat(displayValue)).toString().substr(0, 9)
            break
          }
          case 'div': {
            const divResult = (parseFloat(pastValue) / parseFloat(displayValue)).toString()

            if (canBeDisplayed(divResult)) {
              display.innerHTML = divResult.substr(0, 9)
            } else {
              display.innerHTML = 'Error'
            }
            break
          }
          case 'mul': {
            const mulResult = (parseFloat(pastValue) * parseFloat(displayValue)).toString()

            if (canBeDisplayed(mulResult)) {
              display.innerHTML = mulResult.substr(0, 9)
            } else {
              display.innerHTML = 'Error'
            }

            break
          }
          case 'sub': {
            const subResult = (parseFloat(pastValue) - parseFloat(displayValue)).toString()
            if (canBeDisplayed(subResult)) {
              display.innerHTML = subResult.substr(0, 9)
            } else {
              display.innerHTML = 'Error'
            }

            break
          }
          case 'add': {
            const result = (parseFloat(pastValue) + parseFloat(displayValue)).toString()
            if (canBeDisplayed(result)) {
              display.innerHTML = result.substr(0, 9)
            } else {
              display.innerHTML = 'Error'
            }
            break
          }
          default: {
            break
          }
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
    default:
      break
  }
}

for (let i = 0; i < buttons.length; i += 1) {
  buttons[i].addEventListener('click', () => calculatePress(buttons[i].value))
}
