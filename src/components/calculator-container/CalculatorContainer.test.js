import React from 'react'
import { render } from '@testing-library/react'
import {describe, test} from "@jest/globals";
import CalculatorContainer from "./CalculatorContainer";


describe('Calculator container tests', () => {
    test('calculator container renders', () => {
        render(<CalculatorContainer />)
    })
})
