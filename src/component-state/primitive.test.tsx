import React, { useState } from 'react'
import { render, fireEvent } from '@testing-library/react'

describe('component state tests', () => {

  const rendered = jest.fn()

  const TestComponent = () => {
    const [_, setStr] = useState('hello world')
    rendered()
    return (
      <>
        <div data-testid='setHelloWorld' onClick={() => setStr('hello world')} />
        <div data-testid='setNewString' onClick={() => setStr('new string')} />
      </>
    )
  }

  beforeEach(() => {
    rendered.mockClear()
  })

  test('TestComponent', () => {
    const { getByTestId } = render(<TestComponent />)
    expect(rendered).toHaveBeenCalledTimes(1)
    fireEvent.click(getByTestId('setHelloWorld'))
    // Does not rerender (shallow compare)
    // wanted behaviour
    expect(rendered).toHaveBeenCalledTimes(1)
    fireEvent.click(getByTestId('setNewString'))
    // wanted behaviour
    expect(rendered).toHaveBeenCalledTimes(2)
  })

})