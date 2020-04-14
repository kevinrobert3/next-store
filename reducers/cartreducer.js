const initState ={
    cartVisible:false,
    noOfItems: 6,
    cartItems:[
        {
            id: '1', type: 'Trouser', price: 1400, name: 'Fine Trouser'
        }
    ]

};

const cartReducer=(state=initState, action)=>{
    if(action.type==="MAKE_CART_VISIBLE"){
       // console.log(action)
       let cartVisibility;
       if(state.cartVisible===true){
           cartVisibility=false;
           //return cartVisibility;
       }else{
           cartVisibility=true;
           //return cartVisibility;
       }
       return{
        ...state,
        cartVisible: cartVisibility,
       }
    }
    
    return state;
}

export default cartReducer;