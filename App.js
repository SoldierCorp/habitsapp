// Dependencies
import 'react-native-gesture-handler'
import React from 'react'
import Navigator from './src/router'
import AppContextProvider from './src/context'

export default function App() {
  return (
		<AppContextProvider>
    	<Navigator />
		</AppContextProvider>
  );
}
