import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Provider } from 'react-redux'
import { render, fireEvent } from '@testing-library/react'

import { freshStore, counterSlice } from './redux'
import { useFail, useSolution } from './defaultValueSelector'

describe('default value selector', () => {
  const effectTriggered = jest.fn()
  const rendered = jest.fn()

  const DisplayCount = () => {
    const dispatch = useDispatch()
    return (
      <>
        <div data-testid='increment1' onClick={() => dispatch(counterSlice.actions.increment1())}>Count Value 1</div>
        <div data-testid='increment2' onClick={() => dispatch(counterSlice.actions.increment2())}>Count Value 2</div>
      </>
    )
  }
  
  const DisplayCountFail = () => {
    const count = useFail()
    useEffect(() => {
      effectTriggered()
    }, [count])
    rendered()
    return <DisplayCount />
  }

  const DisplayCountSolution = () => {
    const count = useSolution()
    useEffect(() => {
      effectTriggered()
    }, [count])
    rendered()
    return <DisplayCount />
  }
  
  let TestComponent: React.FunctionComponent = () => null
  beforeEach(() => {
    rendered.mockClear()
    effectTriggered.mockClear()
    const store = freshStore()
    TestComponent = (props) => (
      <Provider store={store}>
        {props.children}
      </Provider>
    )
  })

  test('DisplayCountFail', () => {
    const { getByTestId, rerender } = render(<TestComponent><DisplayCountFail /></TestComponent>)
    // initially it renders 2 times instead of 1
    // incorrect behavior!!
    expect(effectTriggered).toHaveBeenCalledTimes(2)
    expect(rendered).toHaveBeenCalledTimes(2)
    rerender(<TestComponent><DisplayCountFail /></TestComponent>)
    // the rerendering triggers the effect
    // at this time the effect should only be triggerd once but was triggerd three times
    // incorrect behavior!!
    expect(effectTriggered).toHaveBeenCalledTimes(3)
    expect(rendered).toHaveBeenCalledTimes(3)
    fireEvent.click(getByTestId('increment1'))
    // after the button click the state is set & the state reference is returned
    // correct behavior
    expect(effectTriggered).toHaveBeenCalledTimes(4)
    expect(rendered).toHaveBeenCalledTimes(4)
    rerender(<TestComponent><DisplayCountFail /></TestComponent>)
    // now the effect doesn't trigger anymore if the button is not clicked
    // correct behavior
    expect(effectTriggered).toHaveBeenCalledTimes(4)
    expect(rendered).toHaveBeenCalledTimes(5)
  })

  test('DisplayCountSolution', () => {
    const { getByTestId, rerender } = render(<TestComponent><DisplayCountSolution /></TestComponent>)
    // initially it renders 1 times
    // correct behavior
    expect(effectTriggered).toHaveBeenCalledTimes(1)
    expect(rendered).toHaveBeenCalledTimes(1)
    rerender(<TestComponent><DisplayCountSolution /></TestComponent>)
    // the rerendering does not trigger the effect
    // correct behavior
    expect(effectTriggered).toHaveBeenCalledTimes(1)
    expect(rendered).toHaveBeenCalledTimes(2)
    fireEvent.click(getByTestId('increment1'))
    // after the button click the state is set & the state reference is returned
    // correct behavior
    expect(effectTriggered).toHaveBeenCalledTimes(2)
    expect(rendered).toHaveBeenCalledTimes(3)
    rerender(<TestComponent><DisplayCountSolution /></TestComponent>)
    // the plain rerendering does not trigger the effect
    // correct behavior
    expect(effectTriggered).toHaveBeenCalledTimes(2)
    expect(rendered).toHaveBeenCalledTimes(4)
  })
})