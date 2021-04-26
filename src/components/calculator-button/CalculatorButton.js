import React from 'react'
import { string } from 'prop-types'
import './CalculatorButton.css'

const CalculatorButton = ({ button_value: buttonValue, display, button_id: buttonId }) => (
  <button className="calculator-button" value={buttonValue} id={buttonId} type="button">{display}</button>
)

CalculatorButton.propTypes = {
  button_value: string,
  display: string,
  button_id: string,
}

CalculatorButton.defaultProps = {
  button_value: null,
  display: null,
  button_id: null,
}

export default CalculatorButton
