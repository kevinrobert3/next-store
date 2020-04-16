export const addItem = (item) => {
  return (dispatch, getState) => {
    //make async call to DB
    dispatch({
      type: "ADD_ITEM",
      cartItem: item,
    });
  };
};
