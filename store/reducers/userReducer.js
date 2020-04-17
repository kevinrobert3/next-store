const initState = {
  anonymous: null,
  UUID: null,
};

const userReducer = (state = initState, action) => {
  if(action.type==="SET_USER"){
    // console.log(action);
    // console.log(action.ifAnonymous);
    // console.log(action.userUID);
    return{
        ...state,
        anonymous: action.ifAnonymous,
        UUID: action.userUID
    }
  }

  return state;
};

export default userReducer;
