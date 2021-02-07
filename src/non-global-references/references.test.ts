import { useEffect } from 'react'
import { renderHook } from '@testing-library/react-hooks'

describe('reference hooks (useEffect of useTestHook should be called only once)', () => {
  describe.each([
    require('./stateObjectReference'),
    require('./refObjectReference'),
  ])('', ({ name, useFail, useSolution }) => {
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

      test('useSolution', () => {
        const useTestHook = () => {
          const result = useSolution()
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