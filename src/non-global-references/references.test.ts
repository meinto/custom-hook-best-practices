import { useEffect } from 'react'
import { renderHook } from '@testing-library/react-hooks'

describe('reference hooks (useEffect of useTestHook should be called only once)', () => {
  describe.each([
    require('./stateObjectReference'),
    require('./refObjectReference'),
  ])('', ({ name, useFail, useSolution }) => {
    describe(name, () => {

      const effectTriggered = jest.fn()

      beforeEach(() => {
        effectTriggered.mockClear()
      })

      test('useFail', () => {
        const useTestHook = () => {
          const result = useFail()
          useEffect(() => effectTriggered(), [result])
        }
        const { rerender } = renderHook(() => useTestHook())
        expect(effectTriggered).toHaveBeenCalledTimes(1)
        rerender()
        // useEffect is triggered twice after rerender
        expect(effectTriggered).toHaveBeenCalledTimes(2) 
      })

      test('useSolution', () => {
        const useTestHook = () => {
          const result = useSolution()
          useEffect(() => effectTriggered(), [result])
        }
        const { rerender } = renderHook(() => useTestHook())
        expect(effectTriggered).toHaveBeenCalledTimes(1)
        rerender()
        expect(effectTriggered).toHaveBeenCalledTimes(1)
      })

    })
  })
})