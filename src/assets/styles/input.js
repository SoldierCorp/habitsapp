import { StyleSheet } from 'react-native';
import { black, darkslategray} from './colors'

const styles = StyleSheet.create({
  textInput: {
		backgroundColor: black,
		borderRadius: 15,
		padding: 15,
		height: 60,
		fontSize: 16,
		borderWidth: 2,
		borderColor: darkslategray,
		color: 'white',
	},
	textInputLight: {
		backgroundColor: 'white',
		borderColor: 'lightgrey',
		color: black
	},
})

export default styles
