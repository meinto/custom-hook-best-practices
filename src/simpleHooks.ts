export const useString = () => 'my static string'
export const useNumber = () => 42
export const useBoolean = () => true
export const useUndefined = () => undefined
export const useNull = () => null

const object = {hello: 'world'}
export const useGlobalObject = () => object

const array = ['hello', 'world']
export const useGlobalArray = () => array
