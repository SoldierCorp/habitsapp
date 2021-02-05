
import { StyleSheet } from 'react-native';
import { deepskyblue } from './colors'

const styles = StyleSheet.create({
  btn: {
		backgroundColor: deepskyblue,
		paddingHorizontal: 10,
		paddingVertical: 0,
		borderRadius: 15,
		marginTop: 20,
		height: 60,
		justifyContent: 'center',
		width: '90%',
		alignSelf: 'center'
	},
	btnText: {
		fontWeight: 'bold',
		textAlign: 'center',
		color: 'white',
		fontSize: 20,
	},
})

export default styles




