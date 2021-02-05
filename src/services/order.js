// Dependencies
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'

// Config
import { API_URL } from '../helpers/config'

// Fn: Get all orders
export const getOrders = async () => {
	const response = await axios({
		method: 'GET',
		url: `${API_URL}/orders`,
	})
	return response.data
}

// Fn: Add new order
export const addOrder = async (data) => {
	const token = await AsyncStorage.getItem('@access_token')

	const response = await axios({
		method: 'POST',
		url: `${API_URL}/orders`,
		data,
		headers: {
			'Authorization': `Bearer ${token}`
		},
	})
	return response.data
}

// Fn: Delete order
export const deleteOrder = async (id) => {
	const token = await AsyncStorage.getItem('@access_token')

	const response = await axios({
		method: 'DELETE',
		url: `${API_URL}/orders/${id}`,
		headers: {
			'Authorization': `Bearer ${token}`
		},
	})
	return response.data
}

