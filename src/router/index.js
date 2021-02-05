// Dependencies
import React, { createRef } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { StackActions } from '@react-navigation/native'

// Styles
import { deepskyblue } from '../assets/styles/colors'

// Components
import Splash from '../components/Splash'
import Login from '../components/Login'
import Orders from '../components/Orders'
import NewOrder from '../components/NewOrder'

// Stacks
const Stack = createStackNavigator()
const AuthStack = createStackNavigator()
const HomeStack = createStackNavigator()


// Use navigation without navigation prop
export const navigationRef = createRef()

export function navigate(name, params) {
  navigationRef.current?.navigate(name, params)
}

export function replace(...args) {
  navigationRef.current?.dispatch(StackActions.replace(...args));
}

const Navigator = () => {

	// Auth stack
	const Auth = () => (
		<AuthStack.Navigator
			initialRouteName="Login"
		>
			<AuthStack.Screen
					name="Login"
					component={Login}
					options={{
						title: 'Inicio de Sesión',
						headerShown: false
					}}
				/>
		</AuthStack.Navigator>
	)

	// Home stack
	const Home = () => (
		<HomeStack.Navigator
			initialRouteName="Orders"
			screenOptions={{
				headerStyle: {
					backgroundColor: deepskyblue
				},
				headerTintColor: '#fff',
				headerTitleStyle: {
					fontWeight: 'bold',
				},
			}}
		>
			<HomeStack.Screen
				name="Orders"
				component={Orders}
				options={{
					title: 'Órdenes'
				}}
			/>
			<HomeStack.Screen name="NewOrder" component={NewOrder} options={{ title: 'Nueva orden' }} />
		</HomeStack.Navigator>
	)

  return (
    <NavigationContainer ref={navigationRef}>
			<Stack.Navigator
				initialRouteName="Splash"
				screenOptions={{
					headerShown: false
				}}
			>
				<Stack.Screen name="Splash" component={Splash}/>
				<Stack.Screen name="Auth" component={Auth}/>
				<Stack.Screen name="Home" component={Home}/>
			</Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigator;
