export const initialState = {
  orders: [],
  loading: false,
  error: null
};

export const reducer = (state, action) => {
  switch (action.type) {
    case 'GET_ORDERS':
      return {
        orders: action.payload
      }
    case 'ADD_ORDER':
      return {
        orders: [...state.orders, action.payload]
			}
		case 'DELETE_ORDER':
      return {
        orders: state.orders.filter(
          orders => orders.Order_ID !== action.payload
        )
      }
    default:
      return state
  }
};
