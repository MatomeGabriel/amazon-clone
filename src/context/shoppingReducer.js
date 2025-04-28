export const shoppingReducer = (state, action) => {
  switch (action.type) {
    case "addToBasket": {
      const existingProduct = state.basket.find(
        (item) => item.id === action.payload.id
      );

      if (existingProduct) {
        return {
          ...state,
          basket: state.basket.map((item) =>
            item.id === action.payload.id
              ? {
                  ...item,
                  basketQuantity:
                    parseInt(item.basketQuantity) +
                      parseInt(action.payload.basketQuantity) * 1 >
                    5
                      ? 5
                      : parseInt(item.basketQuantity) +
                        parseInt(action.payload.basketQuantity) * 1,
                }
              : item
          ),
        };
      } else {
        return { ...state, basket: [...state.basket, action.payload] };
      }
    }
    case "emptyBasket":
      return { ...state, basket: [] };

    case "decrementQuantity":
      return {
        ...state,
        basket: state.basket.map((item) =>
          item.id === action.payload.id
            ? { ...item, basketQuantity: item.basketQuantity - 1 }
            : item
        ),
      };

    case "setUser":
      return {
        ...state,
        user: action.payload,
      };

    case "navigateTo":
      return {
        ...state,
        linkTo: action.payload,
      };

    case "removeFromBasket":
      return {
        ...state,
        basket: state.basket?.filter((item) => item.id !== action.payload),
      };
  }
};
