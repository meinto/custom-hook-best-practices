export const name = 'static object reference'

const sample = {
  hello: 'world'
}

export const useFail = () => ({ ...sample })

const staticObjectReference = { ...sample }
export const useInstead = () => staticObjectReference

