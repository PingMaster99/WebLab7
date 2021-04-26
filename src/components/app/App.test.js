import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, test } from '@jest/globals'
import App from './App'

describe('Calculator tests', () => {
  test('calculator renders', () => {
    render(<App />)
  })

  // Nota: me di cuenta que estos tests estan mal hechos, no tomarlos en cuenta.

  test('clicks are displayed', () => {
    render(<App />)
    fireEvent.click(screen.getByText('9'))
    fireEvent.click(screen.getByText('8'))
    fireEvent.click(screen.getByText('8'))
    fireEvent.click(screen.getByText('7'))

    const display = document.getElementById('main-display')
    expect(display.innerHTML === '987')
  })

  test('operations that result in more than 9 digits produce an error', () => {
    render(<App />)
    let i = 0
    const button_nine = screen.getByText('9')
    for (i = 0; i < 9; i++) {
      fireEvent.click(button_nine)
    }

    fireEvent.click(screen.getByText('x'))

    for (i = 0; i < 9; i++) {
      fireEvent.click(button_nine)
    }
    fireEvent.click(screen.getByText('='))

    const display = document.getElementById('main-display')
    expect(display.innerHTML === 'Error')
  })

  test('operations can be chained (add, mul, div, sub, mod, inv)', () => {
    render(<App />)
    const buttons = document.querySelectorAll('.calculator-button')

    // 78 + 20
    fireEvent.click(buttons[4]) // 7
    fireEvent.click(buttons[5]) // 8

    fireEvent.click(buttons[15]) // +

    fireEvent.click(buttons[13]) // 2
    fireEvent.click(buttons[16]) // 0

    fireEvent.click(buttons[18]) // =

    // 98 * 100
    fireEvent.click(buttons[8])

    fireEvent.click(buttons[12])
    fireEvent.click(buttons[16])
    fireEvent.click(buttons[16])

    fireEvent.click(buttons[18])

    // 9800 / 98

    fireEvent.click(buttons[3])

    fireEvent.click(buttons[6])
    fireEvent.click(buttons[5])

    fireEvent.click(buttons[18])

    // 100 - 99

    fireEvent.click(buttons[11])
    fireEvent.click(buttons[6])
    fireEvent.click(buttons[6])
    fireEvent.click(buttons[18])

    // 1 % 195
    fireEvent.click(buttons[2])
    fireEvent.click(buttons[13])
    fireEvent.click(buttons[18])

    // +/- 1
    fireEvent.click(buttons[1])

    const display = document.getElementById('main-display')
    expect(display.innerHTML === '-1')
  })

  test('cannot add multiple decimal points', () => {
    render(<App />)
    const decimal = screen.getByText('.')
    const zero = document.getElementById('zero')
    const one = screen.getByText('1')

    let i = 0

    for (i = 0; i < 11; i++) {
      fireEvent.click(decimal)
    }

    fireEvent.click(zero)
    fireEvent.click(one)

    const display = document.getElementById('main-display')
    expect(display.innerHTML === '0.01')
  })

  test('you cannot add more than 9 characters', () => {
    render(<App />)
    const eight = screen.getByText('8')

    let i = 0

    for (i = 0; i < 11; i++) {
      fireEvent.click(eight)
    }

    const display = document.getElementById('main-display')
    expect(display.innerHTML === '88888888')
  })
})
