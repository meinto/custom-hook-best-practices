// no problems with references
const object = {hello: 'world'}
export const useGlobalObject = () => object

const array = ['hello', 'world']
export const useGlobalArray = () => array

const nestedObject = { nested: { hello: 'world' } }
export const useNestedGlobalObject = () => nestedObject.nested
export const useNestedGlobalObjectClone = () => ({ ...nestedObject }.nested)

const objectArray = [{ hello: 'world' }]
export const useNestedGlobalArray = () => objectArray[0]
export const useNestedGlobalArrayClone = () => [...objectArray][0]