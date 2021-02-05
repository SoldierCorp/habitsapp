import { StyleSheet } from 'react-native';
import { black, deepskyblue } from '../../assets/styles/colors'

const styles = StyleSheet.create({
	screen: {
		backgroundColor: black,
	},
	innerScreen: {
		marginBottom: 50,
		justifyContent: 'flex-end',
		flexGrow: 1,
	},
  form: {
		marginTop: 30,
	},
	welcomeText: {
		color: deepskyblue,
		fontSize: 45,
	},
	marginTop: {
		marginTop: 20
	},
})

export default styles
