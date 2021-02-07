import React, { useState } from 'react'
import { dequal } from 'dequal'
import { render, fireEvent } from '@testing-library/react'

describe('component object state tests', () => {

  const rendered = jest.fn()

  const TestComponentFail = () => {
    const [count, setCount] = useState({ num: 0 })
    rendered()
    return (
      <>
        <div data-testid='setCurrent' onClick={() => setCount({ num: count.num })} />
        <div data-testid='increase' onClick={() => setCount({ num: count.num + 1 })} />
      </>
    )
  }

  const TestComponentSolution = () => {
    const [count, setCount] = useState({ num: 0 })
    rendered()
    return (
      <>
        <div data-testid='setCurrent' onClick={() => {
          const newCount = { num: count.num }
          if (!dequal(newCount, count)) {
            setCount(newCount) // will not happen
          }
        }} />
        <div data-testid='increase' onClick={() => setCount({ num: count.num + 1 })} />
      </>
    )
  }

  beforeEach(() => {
    rendered.mockClear()
  })

  test('TestComponentFail', () => {
    const { getByTestId } = render(<TestComponentFail />)
    expect(rendered).toHaveBeenCalledTimes(1)
    fireEvent.click(getByTestId('setCurrent'))
    // It rerenders although the number has not changed
    // It rerenders because of the new reference
    // unwanted behaviour!!
    expect(rendered).toHaveBeenCalledTimes(2)
    fireEvent.click(getByTestId('increase'))
    // wanted behaviour
    expect(rendered).toHaveBeenCalledTimes(3)
  })

  test('TestComponentSolution', () => {
    const { getByTestId } = render(<TestComponentSolution />)
    expect(rendered).toHaveBeenCalledTimes(1)
    fireEvent.click(getByTestId('setCurrent'))
    // It does not rerender because the objects are equal.
    // wanted behaviour
    expect(rendered).toHaveBeenCalledTimes(1)
    fireEvent.click(getByTestId('increase'))
    // wanted behaviour
    expect(rendered).toHaveBeenCalledTimes(2)
  })
})