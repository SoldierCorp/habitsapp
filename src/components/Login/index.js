import React, { useState } from 'react'
import {
	ActivityIndicator,
	ScrollView,
	View,
	TextInput,
	Text,
	TouchableOpacity,
	ToastAndroid,
	StatusBar
} from 'react-native'
import { StackActions } from '@react-navigation/native'

// Styles
import generalStyle from '../../assets/styles/general'
import inputStyle from '../../assets/styles/input'
import buttonStyle from '../../assets/styles/button'
import { black, grey } from '../../assets/styles/colors'


import style from './style'

// Services
import { login } from '../../services/user'

const Login = ({ navigation }) => {

	// Variables
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [loading, setLoading] = useState(false)

	// Fn: Login
	const doLogin = () => {
		if (username.trim() === '' || password.trim() === '' || loading) {
			return false
		}

		setLoading(true)
		login(username, password).then(r => {
			setLoading(false)
			navigation.dispatch(
				StackActions.replace('Home')
			)
		}).catch(e => {
			setLoading(false)
			ToastAndroid.show(
				e.response.data.msg,
				ToastAndroid.SHORT,
				ToastAndroid.CENTER
			);
		})
	}

	return (
		<>
			<StatusBar backgroundColor={black} />
			<ScrollView
				contentContainerStyle={{flexGrow: 1}}
				style={[generalStyle.screen, style.screen]}
				keyboardShouldPersistTaps='handled'
			>
				<View style={style.innerScreen}>
					<Text style={style.welcomeText}>¡Bienvenido!</Text>
					<View style={style.form}>
						<TextInput
							style={inputStyle.textInput}
							placeholder="Usuario"
							value={username}
							onChangeText={setUsername}
							autoCapitalize="none"
							placeholderTextColor={grey}
						/>
						<TextInput
							style={[inputStyle.textInput, style.marginTop]}
							placeholder="Contraseña"
							value={password}
							onChangeText={setPassword}
							placeholderTextColor={grey}
							secureTextEntry
						/>
						<TouchableOpacity
							style={buttonStyle.btn}
							onPress={doLogin}
						>
							{
								loading ? (
									<ActivityIndicator size="small" color="#FFFF" />
								) : (
									<Text style={buttonStyle.btnText}>Ingresar</Text>
								)
							}
						</TouchableOpacity>
					</View>
				</View>
			</ScrollView>
		</>
	)
}

export default Login
