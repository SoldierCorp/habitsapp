import React, { useState, useEffect, useLayoutEffect, useContext } from 'react'
import {
	ScrollView,
	RefreshControl,
	ActivityIndicator,
	View,
	Text,
	TouchableOpacity,
	Button,
	StatusBar,
	ToastAndroid
} from 'react-native'
import { AppContext } from '../../context'

// Styles
import generalStyle from '../../assets/styles/general'
import style from './style'
import { deepskyblue } from '../../assets/styles/colors'

// Services
import { getOrders, deleteOrder } from '../../services/order'
import { logout } from '../../services/user'

const Orders = ({ navigation }) => {

	const [{ orders: ordersReducer}, dispatch] = useContext(AppContext)

	// React navigation header
	useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
				<View style={{flexDirection: 'row'}}>
					<Button
						onPress={() => navigation.navigate('NewOrder')}
						color="#011223"
						title="Nueva orden"
					/>
					<TouchableOpacity
						onPress={doLogout}
						style={style.headerBtnLogout}
					>
						<Text style={style.headerBtnLogoutText}>Salir</Text>
					</TouchableOpacity>
				</View>

      ),
    });
	}, [navigation]);

	// Variables
	const [refreshing, setRefresing] = useState(true)
	const [orderToDelete, setOrderToDelete] = useState(null)
	const [deletingOrder, setDeletingOrder] = useState(null)

	// Fn: On refresh
	const onRefresh = () => {
		if (deletingOrder) return false
		setRefresing(true)
		onGetOrders()
	}

	// Fn: Get orders
	const onGetOrders = () => {
		getOrders().then(r => {
			dispatch({
      	type: 'GET_ORDERS',
      	payload: r
    	})
			setRefresing(false)
		}).catch(e => {
			setRefresing(false)
			catchErrors()
		})
	}

	// Fn: Delete order
	const onDeleteOrder = () => {
		setDeletingOrder(true)
		deleteOrder(orderToDelete).then(r => {
			dispatch({
      	type: 'DELETE_ORDER',
      	payload: orderToDelete
    	})
			setOrderToDelete(null)
			setDeletingOrder(false)
		}).catch(e => {
			setRefresing(false)
			catchErrors()
		})
	}

	// Fn: Catch error on orders
	const catchErrors = (e) => {
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
	}

	// Fn: On long press
	const onLongPress = (id) => {
		if (deletingOrder) return false
		setOrderToDelete(orderToDelete === id ? null : id)
	}

	// Fn: Logout
	const doLogout = () => {
		logout()
	}

	// Effect: On load
	useEffect(() => {
		onGetOrders()
	}, [])

	// Fn: Render list
	const renderList = () => {
		if (ordersReducer.length === 0 && !refreshing) {
			return (
				<Text style={style.noOrders}>No hay órdenes disponibles</Text>
			)
		}

		return ordersReducer.map(o => (
			<TouchableOpacity key={o.Order_ID} style={style.orderItem} onLongPress={() => onLongPress(o.Order_ID)}>
				<View style={style.orderItemLeft}>
					<Text style={style.orderItemId}>Orden #{o.Order_ID}</Text>
					<Text style={style.orderItemFlavor}>{o.Flavor}</Text>
					<Text style={style.orderItemCrust}>{o.Crust} / <Text style={[style.orderItemSize, style[`orderItemSize${o.Size}`]]}>{o.Size}</Text></Text>

					<Text style={style.orderTimestamp}>
						{
							new Date(o.Timestamp).toLocaleDateString()
						}
					</Text>
				</View>
				<View style={[style.orderItemRight, orderToDelete === o.Order_ID && style.orderItemRightDelete]}>
					{
						orderToDelete === o.Order_ID ? (
							<TouchableOpacity style={[style.orderItemTable, style.orderItemBtnDelete]} onPress={onDeleteOrder}>
								{
									deletingOrder ? (
										<ActivityIndicator size="small" color="#FFFF" />
									) : (
										<Text style={style.orderItemBtnDeleteText}>X</Text>
									)
								}
							</TouchableOpacity>
						) : (
							<Text style={style.orderItemTable}>T: {o.Table_No}</Text>
						)
					}
					</View>
			</TouchableOpacity>
		))
	}

	return (
		<>
			<StatusBar backgroundColor={deepskyblue} />
			<ScrollView
				contentContainerStyle={{flexGrow: 1}}
				style={[generalStyle.screen, style.screen]}
				refreshControl={
					<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
				}
			>
				<View style={style.innerScreen}>
					<View>
						{renderList()}
					</View>
				</View>
			</ScrollView>
		</>
	)
}

export default Orders
