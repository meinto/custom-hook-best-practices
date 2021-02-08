import { useMemo } from 'react'

export const name = 'memorized object reference'

export const useFail = (obj: { hello: string }) => ({ hello: obj.hello })

export const useNotRealyASolution = (obj: { hello: string }) => {
  // same problem with object references in dependencies of useMemo Hook
  // use useRef instead: ./useRef.ts
  const memorizedObject = useMemo(() => ({ hello: obj.hello }), [obj])
  return memorizedObject
}

