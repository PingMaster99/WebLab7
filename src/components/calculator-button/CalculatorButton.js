import React from 'react'
import {string} from 'prop-types'
import './CalculatorButton.css'

const CalculatorButton = ({button_value, display, button_id}) => {
    return (
        <button className="calculator-button" value={button_value} id={button_id}>{display}</button>
    )
}


CalculatorButton.propTypes = {
    button_value: string,
    display: string,
    button_id: string,
}



export default CalculatorButton
