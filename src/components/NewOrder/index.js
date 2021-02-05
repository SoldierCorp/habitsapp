import React, { useState, useContext } from 'react'
import {
	ActivityIndicator,
	ScrollView,
	View,
	TextInput,
	Text,
	TouchableOpacity,
	ToastAndroid
} from 'react-native'
import { AppContext } from '../../context'
import { Picker } from '@react-native-picker/picker'

// Styles
import generalStyle from '../../assets/styles/general'
import inputStyle from '../../assets/styles/input'
import buttonStyle from '../../assets/styles/button'
import style from './style'
import { black } from '../../assets/styles/colors'


// Services
import { addOrder } from '../../services/order'
import { sessionExpired } from '../../services/user'


const NewOrder = ({ navigation }) => {

	const [_, dispatch]= useContext(AppContext)

	// Variables
	const [crust, setCrust] = useState('')
	const [flavor, setfFlavor] = useState('')
	const [size, setSize] = useState('')
	const [table, setTable] = useState('')
	const [loading, setLoading] = useState(false)

	// Fn: Add order
	const doAdOrder = () => {
		if (
			crust.trim() === '' ||
			flavor.trim() === '' ||
			size.trim() === '' ||
			table.trim() === '' ||
			loading
		) {
			return false
		}

		setLoading(true)

		const data = {
			Crust: crust,
			Flavor: flavor,
			Size: size,
			Table_No: parseInt(table),
		}
		addOrder(data).then(r => {
			setLoading(false)

			// New order
			dispatch({
      	type: 'ADD_ORDER',
      	payload: r
			})

			navigation.goBack()
		}).catch(e => {
			setLoading(false)

			// Logout when token has expired
			if (e.response.status === 401) {
				sessionExpired(e.response.data.msg)
			} else {
				ToastAndroid.show(
					e.response.data.detail,
					ToastAndroid.LONG,
					ToastAndroid.CENTER
				)
			}
		})
	}

	return (
		<ScrollView
			contentContainerStyle={{flexGrow: 1}}
			style={[generalStyle.screen, style.screen]}
			keyboardShouldPersistTaps='handled'
		>
			<View style={style.innerScreen}>
				<View style={style.form}>
					<TextInput
						style={[inputStyle.textInput, inputStyle.textInputLight, style.input]}
						placeholder="Crust"
						value={crust}
						onChangeText={setCrust}
						autoCapitalize="none"
					/>
					<TextInput
						style={[inputStyle.textInput, inputStyle.textInputLight, style.input]}
						placeholder="Flavor"
						value={flavor}
						onChangeText={setfFlavor}
						autoCapitalize="none"
					/>
					<View style={[inputStyle.textInput, inputStyle.textInputLight, style.input, style.picker]}>
						<Picker
							selectedValue={size}
							style={{color: size === '' ? '#AAA' : black}}
							onValueChange={itemValue => setSize(itemValue)}>
							<Picker.Item label="Size" value="" />
							<Picker.Item label="S" value="S" />
							<Picker.Item label="M" value="M" />
							<Picker.Item label="L" value="L" />
						</Picker>
					</View>
					<TextInput
						style={[inputStyle.textInput, inputStyle.textInputLight, style.input]}
						placeholder="Table"
						value={table}
						onChangeText={setTable}
						keyboardType="number-pad"
						maxLength={2}
						autoCapitalize="none"
					/>
					<TouchableOpacity
						style={buttonStyle.btn}
						onPress={doAdOrder}
					>
						{
							loading ? (
								<ActivityIndicator size="small" color="#FFFF" />
							) : (
								<Text style={buttonStyle.btnText}>Agregar Orden</Text>
							)
						}
					</TouchableOpacity>
				</View>
			</View>
		</ScrollView>
	)
}

export default NewOrder
