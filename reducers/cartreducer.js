const initState ={
    cartVisible: false,
    noOfItems: 6,
    cartItems:[
        {
            id: '1', type: 'Trouser', price: 1400, name: 'Fine Trouser'
        }
    ]

};

const cartReducer=(state=initState, action)=>{
    if(action.type==="MAKE_CART_VISIBLE"){
       let cartVisibility;
       if(state.cartVisible===true){
           cartVisibility=false;
           //console.log(cartVisibility);
       }else{
           cartVisibility=true;
           //console.log(cartVisibility);
       }
       console.log(cartVisibility)
       return{
        ...state,
        cartVisible: cartVisibility,
       }
    }
    
    return state;
}

export default cartReducer;