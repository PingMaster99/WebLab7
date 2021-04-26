import React from 'react'
import { render } from '@testing-library/react'
import { describe, test } from '@jest/globals'
import CalculatorButton from './CalculatorButton'

describe('Button tests', () => {
  test('button renders', () => {
    render(<CalculatorButton />)
  })
})
