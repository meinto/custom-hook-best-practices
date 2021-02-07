import { configureStore, createSlice, combineReducers } from "@reduxjs/toolkit";

interface CounterState {
  value1: { count: number },
  value2: { count: number },
}
const initialState: Partial<CounterState> = {}
export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment1: (state) => {
      if (!state.value1) state.value1 = { count: 0 }
      state.value1.count++
    },
    increment2: (state) => {
      if (!state.value2) state.value2 = { count: 0 }
      state.value2.count++
    }
  }
})

type ListState = { list: string }[]
const initialListState: Partial<ListState> = [
  { list: 'element1' },
  { list: 'element2' },
  { list: 'element3' },
  { list: 'element4' },
  { list: 'element5' },
]
export const listSlice = createSlice({
  name: 'counter',
  initialState: initialListState,
  reducers: {
    addToList: state => {
      state.push({ list: `element${state.length+1}` })
    }
  }
})

export const rootReducer = combineReducers({
  counter: counterSlice.reducer,
  list: listSlice.reducer,
})

export const freshStore = () => configureStore({
  reducer: rootReducer,
})
