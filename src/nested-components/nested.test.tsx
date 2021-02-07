import React, { useState } from "react"
import { render, fireEvent } from '@testing-library/react'

describe('nested component test', () => {

  const renderedChild = jest.fn()
  const renderedParent = jest.fn()

  const Child = () => {
    const [_, setState] = useState({})
    renderedChild()
    return <div data-testid='setChildState' onClick={() => setState({})} />
  }

  const Parent = () => {
    const [_, setState] = useState({})
    renderedParent()
    return (<>
      <Child />
      <div data-testid='setParentState' onClick={() => setState({})} />
    </>)
  }

  // Make small components to ensure that only required viewpars are rerenderd
  test('component rendering', () => {
    const { getByTestId } = render(<Parent />)
    expect(renderedParent).toHaveBeenCalledTimes(1)
    expect(renderedChild).toHaveBeenCalledTimes(1)
    fireEvent.click(getByTestId('setParentState'))
    expect(renderedParent).toHaveBeenCalledTimes(2)
    expect(renderedChild).toHaveBeenCalledTimes(2)
    fireEvent.click(getByTestId('setChildState'))
    expect(renderedParent).toHaveBeenCalledTimes(2)
    expect(renderedChild).toHaveBeenCalledTimes(3)
  })
})