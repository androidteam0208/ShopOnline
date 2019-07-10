import * as CONSTANTS from "../Constants/Data";
import axios from 'axios';

// export const getMenuData = () => {
//   return dispatch => { 
//       axios({
//           url: 'https://shoponline-5fa44.firebaseio.com/Categories.json',
//           method: 'GET'
//       }).then(result => {
//           console.log(result.data);
//           dispatch({
//               type:"GET_MENU_DATA",
//               categoryMenu:result.data
//           })
//       }).catch(erorr => {
//           console.log(erorr.respone.data);
//       })
//     }
// }

export const addItemInCart = item => ({
  type: CONSTANTS.ADD_ITEM_IN_CART,
  payload: item
});
export const showCartDlg = status => ({
  type: CONSTANTS.SHOW_CART_DLG,
  payload: status
});
export const deleteCartItem = id => ({
  type: CONSTANTS.DELETE_CART_ITEM,
  payload: id
});
export const toggleMenu = () => ({
  type: CONSTANTS.TOGGLE_MENU,
  payload: null
});
export const updateCartItemQnt = obj => ({
  type: CONSTANTS.UPDATE_CART_ITEM_QUANTITY,
  payload: obj
});
export const setCheckedOutItems = items => ({
  type: CONSTANTS.SET_CHECKEDOUT_ITEMS,
  payload: items
});
export const setLoggedInUser = user => ({
  type: CONSTANTS.SET_LOGGED_IN_USER,
  payload: user
});
