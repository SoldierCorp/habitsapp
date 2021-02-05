// Dependencies
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { ToastAndroid } from 'react-native'

// Config
import { API_URL } from '../helpers/config'

// Navigation
import { replace as navigationReplace } from '../router'

// Fn: Login
export const login = async (username, password) => {
	const response = await axios({
		method: 'POST',
		url: `${API_URL}/auth`,
		data: { username, password }
	})
	await AsyncStorage.setItem('@access_token', response.data.access_token)
	return response.data.access_token
}

// Fn: Logout
export const logout = async () => {
  try {
		await AsyncStorage.removeItem('@access_token')
		navigationReplace('Auth')
  } catch(e) {
    navigationReplace('Auth')
		return false
  }
}

// Fn: Session expired
export const sessionExpired = async (message) => {
	ToastAndroid.show(
		message,
		ToastAndroid.LONG,
		ToastAndroid.CENTER
	)

  try {
		await AsyncStorage.removeItem('@access_token')
		navigationReplace('Auth')
  } catch(e) {
    navigationReplace('Auth')
		return false
  }
}

// Fn: Get session
export const getSession = async () => {
  try {
		return await AsyncStorage.getItem('@access_token')
  } catch(e) {
    return false
  }
}
