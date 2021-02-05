import { StyleSheet } from 'react-native';
import { whitesmoke, deepskyblue, crimson, goldenRod, darkseagreen } from '../../assets/styles/colors'

const styles = StyleSheet.create({
	screen: {
		backgroundColor: whitesmoke,
	},
	headerBtnLogout: {
		backgroundColor: crimson,
		alignItems: 'center',
		justifyContent: 'center',
		paddingHorizontal: 10,
		marginLeft: 15,
		borderTopLeftRadius: 3,
		borderBottomLeftRadius: 3,
	},
	headerBtnLogoutText: {
		color: 'white'
	},
	noOrders: {
		fontSize: 18,
	},
	orderItem: {
		borderRadius: 15,
		backgroundColor: 'white',
		marginBottom: 10,
		alignItems: 'center',
		flexDirection: 'row'
	},
	orderItemLeft: {
		padding: 15,
		flex: 1,
	},
	orderItemRight: {
		marginLeft: 20,
		backgroundColor: deepskyblue,
		justifyContent: 'center',
		alignItems: 'center',
		alignSelf: 'stretch',
		width: 60,
		borderTopRightRadius: 15,
		borderBottomRightRadius: 15,
	},
	orderItemRightDelete: {
		backgroundColor: crimson,
	},
	orderItemBtnDelete: {
		alignSelf: 'stretch',
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		borderTopRightRadius: 15,
		borderBottomRightRadius: 15,
	},
	orderItemBtnDeleteText: {
		fontSize: 25,
		color: 'white'
	},
	orderItemId: {
		color: 'grey',
		fontStyle: 'italic',
		fontSize: 15,
	},
	orderItemFlavor: {
		fontSize: 18,
		fontWeight: 'bold'
	},
	orderTimestamp: {
		marginTop: 5,
		color: 'grey',
	},
	orderItemTable: {
		fontSize: 25,
		color: 'white'
	},
	orderItemSize: {
		fontWeight: 'bold',
	},
	orderItemSizeS: {
		color: goldenRod
	},
	orderItemSizeM: {
		color: deepskyblue
	},
	orderItemSizeL: {
		color: darkseagreen
	},

})

export default styles
