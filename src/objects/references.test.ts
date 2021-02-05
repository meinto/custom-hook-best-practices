import { useEffect } from 'react'
import { renderHook } from '@testing-library/react-hooks'

describe('reference hooks (useEffect of useTestHook should be called only once)', () => {
  describe.each([
    require('./staticObjectReference'),
    require('./stateObjectReference'),
    require('./refObjectReference'),
  ])('', ({ name, useFail, useInstead }) => {
    describe(name, () => {

      const effectTrigger = jest.fn()

      beforeEach(() => {
        effectTrigger.mockClear()
      })

      test('useFail', () => {
        const useTestHook = () => {
          const result = useFail()
          useEffect(() => effectTrigger(), [result])
        }
        const { rerender } = renderHook(() => useTestHook())
        expect(effectTrigger).toHaveBeenCalledTimes(1)
        rerender()
        // useEffect is triggered twice
        expect(effectTrigger).not.toHaveBeenCalledTimes(1) 
        expect(effectTrigger).toHaveBeenCalledTimes(2) 
      })

      test('useInstead', () => {
        const useTestHook = () => {
          const result = useInstead()
          useEffect(() => effectTrigger(), [result])
        }
        const { rerender } = renderHook(() => useTestHook())
        expect(effectTrigger).toHaveBeenCalledTimes(1)
        rerender()
        expect(effectTrigger).toHaveBeenCalledTimes(1)
      })

    })
  })
})