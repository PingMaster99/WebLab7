import React from 'react'
import './CalculatorContainer.css'
import ButtonGrid from '../button-grid'

const CalculatorContainer = () => (
  <div className="calculator-container">
    <div className="display">
      <h2 className="display-content" id="main-display">0</h2>
    </div>

    <ButtonGrid />
  </div>
)

export default CalculatorContainer
