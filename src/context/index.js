// Dependencies
import React, { createContext, useReducer, useState } from 'react'
import { initialState, reducer } from './reducer'

// Create context
export const AppContext = createContext()

const AppContextProvider = props => {
	const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider value={[state, dispatch]}>
      {props.children}
    </AppContext.Provider>
  );
}

export default AppContextProvider
