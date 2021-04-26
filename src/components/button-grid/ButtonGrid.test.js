import React from 'react'
import { render } from '@testing-library/react'
import { describe, test } from '@jest/globals'
import ButtonGrid from './ButtonGrid'

describe('Button grid tests', () => {
  test('grid renders', () => {
    render(<ButtonGrid />)
  })
})
