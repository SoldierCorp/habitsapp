// Dependencies
import React, { useEffect } from 'react'
import { StackActions } from '@react-navigation/native'

// Services
import { getSession } from '../../services/user'

export default function Splash({navigation}) {
	useEffect(() => {
		getSession().then(r => {
			navigation.dispatch(
				StackActions.replace(r !== null ? 'Home' : 'Auth')
			);
		}).catch(e => {
			navigation.dispatch(
				StackActions.replace('Auth')
			);
		})
	}, [])

	return (
		<></>
	)
}
