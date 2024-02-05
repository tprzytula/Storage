import { createContext, useReducer } from 'react'
import { StateComponentProps, Actions, Action, State, Context } from './types'

export { Actions } from './types'

export const initialState: State = {
  storage: [],
}

export const AppState = createContext<Context>({
  state: initialState,
  dispatch: () => null,
})

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case Actions.SET_STORAGE:
      return { ...state, storage: action.payload }
    case Actions.ADD_STORAGE_ITEM:
      return { ...state, storage: [...state.storage, action.payload] }
    case Actions.REMOVE_STORAGE_ITEM: {
      const newStorage = state.storage.filter(({ id }) => id !== action.payload)

      return { ...state, storage: newStorage }
    }
    case Actions.UPDATE_STORAGE_ITEM: {
      const newStorage = state.storage.map((item) => {
        if (item.id === action.payload.id) {
          return action.payload
        }

        return item
      })

      return { ...state, storage: newStorage }
    }
    default:
      return state
  }
}

export const StateComponent = ({ children }: StateComponentProps) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <AppState.Provider value={{ state, dispatch }}>
      {children}
    </AppState.Provider>
  )
}

export default StateComponent
