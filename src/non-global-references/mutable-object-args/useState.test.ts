import { useEffect } from 'react'
import { renderHook } from '@testing-library/react-hooks'

import { useFail, useSolution } from './useState'

describe('useState: mutable object references (object args)', () => {
  const effectTriggered = jest.fn()

  beforeEach(() => {
    effectTriggered.mockClear()
  })

  test('useFail', () => {
    const useTestHook = (props: { hello: string }) => {
      const result = useFail(props)
      useEffect(() => effectTriggered(), [result])
      return result
    }
    const { result, rerender } = renderHook((props) => useTestHook(props), {
      initialProps: { hello: 'world' }
    })
    expect(effectTriggered).toHaveBeenCalledTimes(1)
    expect(result.current).toEqual({ hello: 'world' })
    rerender({ hello: 'world' })
    // useEffect is triggered twice after rerender although the props did not change
    expect(effectTriggered).toHaveBeenCalledTimes(2) 
    expect(result.current).toEqual({ hello: 'world' })
    rerender({ hello: 'world 2' })
    expect(effectTriggered).toHaveBeenCalledTimes(3) 
    expect(result.current).toEqual({ hello: 'world 2' })
  })

  test('useSolution', () => {
    const useTestHook = (props: { hello: string }) => {
      const result = useSolution(props)
      useEffect(() => effectTriggered(), [result])
      return result
    }
    const { result, rerender } = renderHook((props) => useTestHook(props), {
      initialProps: { hello: 'world' }
    })
    expect(effectTriggered).toHaveBeenCalledTimes(1)
    expect(result.current).toEqual({ hello: 'world' })
    rerender({ hello: 'world' })
    expect(effectTriggered).toHaveBeenCalledTimes(1)
    expect(result.current).toEqual({ hello: 'world' })
    rerender({ hello: 'world 2' })
    expect(effectTriggered).toHaveBeenCalledTimes(2)
    expect(result.current).toEqual({ hello: 'world 2' })
  })
})