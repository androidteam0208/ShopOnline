import * as CONSTANTS from "../Constants/Data";

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

    //add shopingcard
    

};

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

    }

    return { ...state };
};

export default rootReducer;
