import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Provider } from 'react-redux'
import { render, fireEvent } from '@testing-library/react'

import { freshStore, listSlice } from './redux'
import { useFail, useSolution } from './filterValuesNotOptimal'

describe('default value selector', () => {
  const effectTriggered = jest.fn()
  const rendered = jest.fn()

  const FilteredList = () => {
    const dispatch = useDispatch()
    return (
      <div data-testid='addToList' onClick={() => dispatch(listSlice.actions.addToList())} />
    )
  }

  const FilteredListFail = () => {
    const count = useFail()
    useEffect(() => {
      effectTriggered()
    }, [count])
    rendered()
    return <FilteredList />
  }

  const FilteredListSolution = () => {
    const count = useSolution()
    useEffect(() => {
      effectTriggered()
    }, [count])
    rendered()
    return <FilteredList />
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

  test('FilteredListFail', () => {
    const { getByTestId ,rerender } = render(<TestComponent><FilteredListFail /></TestComponent>)
    // initially it renders 2 times instead of 1
    // incorrect behavior!!
    expect(effectTriggered).toHaveBeenCalledTimes(2)
    rerender(<TestComponent><FilteredListFail /></TestComponent>)
    // the rerendering triggers the effect
    // at this time the effect should only be triggerd once but was triggerd three times
    // incorrect behavior!!
    expect(effectTriggered).toHaveBeenCalledTimes(3)
    fireEvent.click(getByTestId('addToList'))
    // after the button click a new list elements was added
    // the number of filtered elements does not change, but the effect is triggerd because of the changing reference
    // incorrect behavior!!
    expect(effectTriggered).toHaveBeenCalledTimes(4)
    expect(rendered).toHaveBeenCalledTimes(4)

    fireEvent.click(getByTestId('addToList'))
    expect(effectTriggered).toHaveBeenCalledTimes(5)
    expect(rendered).toHaveBeenCalledTimes(5)
  })

  test('FilteredListSolution', () => {
    const { getByTestId, rerender } = render(<TestComponent><FilteredListSolution /></TestComponent>)
    // initially it renders 1 times
    // correct behavior
    expect(effectTriggered).toHaveBeenCalledTimes(1)
    expect(rendered).toHaveBeenCalledTimes(2)
    rerender(<TestComponent><FilteredListSolution /></TestComponent>)
    // the rerendering does not trigger the effect
    // correct behavior
    expect(effectTriggered).toHaveBeenCalledTimes(1)
    expect(rendered).toHaveBeenCalledTimes(3)
    fireEvent.click(getByTestId('addToList'))
    // after the button click a new list elements was added
    // the number of filtered elements does not change -> effect not triggerd
    // correct behavior
    expect(effectTriggered).toHaveBeenCalledTimes(1)
    expect(rendered).toHaveBeenCalledTimes(4)
    fireEvent.click(getByTestId('addToList'))
    // after the button click a new list elements was added
    // the number of filtered elements change -> effect triggerd
    // correct behavior
    expect(effectTriggered).toHaveBeenCalledTimes(2)
    // the downside of this solution is, that there is one additional rerender step because of the 
    // state change in the selector hook
    expect(rendered).toHaveBeenCalledTimes(6)
  })
})