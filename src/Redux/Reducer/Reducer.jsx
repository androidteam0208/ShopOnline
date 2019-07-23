import * as CONSTANTS from "../Constants/Data";
import firebase from 'firebase';

// If multiple components need access to some data, in that case we store such data in redux.
const initialState = {
    cartItems: [],
    showCartDialog: false,
    showMenu: true,
    checkedOutItems: [],
    loggedInUser: null,


    // data category get on firebase
    categoryData: [],
    menuItems: [],
    expandedItems: [],
    productData: [],

    //add shopingcart
    paymentInfor: [],
    totalPrice: 0,
    cartInfor: {},
    idShoppingCart: 0,
    //for user
    user:{},
    idNewUser: 0,


};
function createId() {
    firebase.database().ref().child("ShoppingCart").on("value", function (snapshot) {
        let idCart = snapshot.numChildren();
        initialState.idShoppingCart = idCart;
    });
    firebase.database().ref().child("Customer").on("value", function (snapshot) {
        let idUser = snapshot.numChildren();
        console.log(idUser);
        
        initialState.idNewUser = idUser;
    });
    return;
}
createId();

function writeCartData(table, data) {
    var updates = {};
    updates[`/${table}/` + initialState.idShoppingCart] = data;
    firebase.database().ref().update(updates).then(()=>{
        // alert("Order Successfull")
    }).catch((error)=>{
        var errorMessage = error.message;
        alert(errorMessage); 
    });
}

function writeUsertData(table, data) {
    var updates = {};
    updates[`/${table}/` + initialState.idNewUser] = data;
    firebase.database().ref().update(updates).then(()=>{
        // alert("Save User Successfull")
    }).catch((error)=>{
        var errorMessage = error.message;
        alert(errorMessage); 
    });
}


const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case CONSTANTS.GET_MENU_DATA:
            {
                state.categoryData = action.categoryData;
                state.expandedItems = action.categoryData.reduce((accum, current) => {
                    if (current.type === "title") {
                        accum[current.id] = true;
                    }
                    return accum;
                }, {});
                state.menuItems = action.categoryData;
                return { ...state };
            }
        case CONSTANTS.GET_PRODUCT_DATA:
            {
                state.productData = action.productData;
                return { ...state };
            }

        case CONSTANTS.ADD_SHOPPING_CART: {

            state.cartInfor = action.cart;
            writeCartData('ShoppingCart',state.cartInfor);
            return { ...state };
        }
        //clear cart 
        case CONSTANTS.CLEAR_CART: {
            return { ...state, cartItems: [] };
        }
        case CONSTANTS.ADD_CUSTOMER: {
            state.user = action.user;
            writeUsertData('Customer',state.user)
            return { ...state };
        }

        case CONSTANTS.ADD_ITEM_IN_CART:
            {
                let index = state.cartItems.findIndex(x => x.id === action.payload.id);
                // Is the item user wants to add already in the cart?
                if (index !== -1) {
                    // Yes, update the quantity.
                    let cloneCartItems = [...state.cartItems];
                    cloneCartItems[index] = {
                        ...cloneCartItems[index],
                        quantity: state.cartItems[index].quantity + action.payload.quantity
                    };

                    return { ...state, cartItems: cloneCartItems };
                }
                // No, add a new item.
                return { ...state, cartItems: state.cartItems.concat(action.payload) };
            }


        case CONSTANTS.SHOW_CART_DLG:
            return { ...state, showCartDialog: action.payload };


        case CONSTANTS.DELETE_CART_ITEM:
            return {
                ...state,
                cartItems: state.cartItems.filter(x => x.id !== action.payload)
            };


        case CONSTANTS.TOGGLE_MENU:
            return { ...state, showMenu: !state.showMenu };


        case CONSTANTS.SET_LOGGED_IN_USER:
            return { ...state, loggedInUser: action.payload };


        case CONSTANTS.SET_CHECKEDOUT_ITEMS:
            return { ...state, checkedOutItems: action.payload };


        case CONSTANTS.UPDATE_CART_ITEM_QUANTITY:
            {
                let index = state.cartItems.findIndex(x => x.id === action.payload.id);
                // User wants to update quantity of existing item.
                if (index !== -1) {
                    let cloneCartItems = [...state.cartItems];
                    cloneCartItems[index] = {
                        ...cloneCartItems[index],
                        quantity: action.payload.quantity
                    };

                    return { ...state, cartItems: cloneCartItems };
                }
                return { ...state };
            }
        default: return { ...state };

    }


};

export default rootReducer;
