import { useReducer } from "react";
import { shoppingReducer } from "./shoppingReducer";
import ShoppingContext from "./ShoppingContext";
import { useNavigate } from "react-router";

const ShoppingState = ({ children }) => {
  const initialState = { basket: [], user: null, linkTo: null };
  const [state, dispatch] = useReducer(shoppingReducer, initialState);
  const navigate = useNavigate();

  const getBasketTotal = (basket) => {
    return basket?.reduce(
      (amount, product) => product.price * product.basketQuantity + amount,
      0
    );
  };
  const formatPrice = (value) => {
    return new Intl.NumberFormat("en-Za", {
      style: "currency",
      currency: "ZAR",
    }).format(value);
  };

  const addToBasket = (item) => {
    dispatch({
      type: "addToBasket",
      payload: item,
    });
  };
  const setLinkTo = (slug) => {
    dispatch({ type: "navigateTo", payload: slug });
  };

  const removeFromBasket = (id) => {
    dispatch({ type: "removeFromBasket", payload: id });
  };

  const emptyBasket = () => {
    dispatch({ type: "emptyBasket" });
  };

  const reloadToCardPage = () => {
    navigate("/cart");
  };

  const decrementQuantity = (product) => {
    dispatch({ type: "decrementQuantity", payload: product });
  };

  const setUser = (user) => {
    dispatch({ type: "setUser", payload: user });
  };

  const getTotalBasketQuantity = (basket) => {
    return basket?.length;
  };
  return (
    <ShoppingContext.Provider
      value={{
        basket: state.basket,
        linkTo: state.linkTo,
        getBasketTotal,
        addToBasket,
        emptyBasket,
        removeFromBasket,
        reloadToCardPage,
        decrementQuantity,
        setUser,
        formatPrice,
        getTotalBasketQuantity,
        user: state.user,
        navigate,
        setLinkTo,
      }}>
      {children}
    </ShoppingContext.Provider>
  );
};

export default ShoppingState;
