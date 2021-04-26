import React from 'react'
import {string} from 'prop-types'
import './ButtonGrid.css'
import CalculatorButton from "../calculator-button";

const ButtonGrid = () => (
    <div className="button-grid">
        <CalculatorButton button_value="c" display="C"/>
        <CalculatorButton button_value="inv" display="+/-"/>
        <CalculatorButton button_value="mod" display="%"/>
        <CalculatorButton button_value="div" display="÷"/>
        <CalculatorButton button_value="7" display="7"/>
        <CalculatorButton button_value="8" display="8"/>
        <CalculatorButton button_value="9" display="9"/>
        <CalculatorButton button_value="mul" display="x"/>
        <CalculatorButton button_value="4" display="4"/>
        <CalculatorButton button_value="5" display="5"/>
        <CalculatorButton button_value="6" display="6"/>
        <CalculatorButton button_value="sub" display="-"/>
        <CalculatorButton button_value="1" display="1"/>
        <CalculatorButton button_value="2" display="2"/>
        <CalculatorButton button_value="3" display="3"/>
        <CalculatorButton button_value="add" display="+"/>
        <CalculatorButton button_value="0" display="0" button_id="zero"/>
        <CalculatorButton button_value="." display="."/>
        <CalculatorButton button_value="=" display="=" button_id="equals"/>
    </div>
)


export default ButtonGrid
