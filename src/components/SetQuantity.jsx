import React, { useContext } from "react";

import "./SetQuantity.css";
import ShoppingContext from "../context/ShoppingContext";
const SetQuantity = ({ product }) => {
  const { addToBasket, decrementQuantity, removeFromBasket } =
    useContext(ShoppingContext);
  return (
    <div className="">
      <div className="sq-group">
        {product.basketQuantity <= 1 && (
          <button
            className="sq-btn"
            onClick={() => removeFromBasket(product.id)}>
            <span class="material-symbols-outlined sq-icon">
              delete_forever
            </span>
          </button>
        )}
        {product.basketQuantity > 1 && (
          <button onClick={() => decrementQuantity(product)} className="sq-btn">
            <span className="material-symbols-outlined sq-icon">remove</span>
          </button>
        )}
        <p className="sq-label">{product.basketQuantity}</p>
        <button
          className="sq-btn"
          onClick={() => addToBasket({ ...product, basketQuantity: 1 })}>
          <span className="material-symbols-outlined sq-icon">add</span>
        </button>
      </div>
    </div>
  );
};

export default SetQuantity;
