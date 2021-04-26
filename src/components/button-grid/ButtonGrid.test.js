import React from 'react'
import { render } from '@testing-library/react'
import ButtonGrid from "./ButtonGrid";
import {describe, test} from "@jest/globals";


describe('Button grid tests', () => {
    test('grid renders', () => {
        render(<ButtonGrid />)
    })
})
