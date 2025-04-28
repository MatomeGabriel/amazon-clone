import React, { useContext } from "react";

import { Link, useNavigate } from "react-router";
import "./CartPage.css";
import SetQuantity from "../components/SetQuantity";
import ShoppingContext from "../context/ShoppingContext";

const CartPage = () => {
  const {
    basket,
    removeFromBasket,
    user,
    getBasketTotal,
    formatPrice,
    getTotalBasketQuantity,
    setLinkTo,
  } = useContext(ShoppingContext);
  console.log(getBasketTotal(basket));
  const subTotal = getBasketTotal(basket);
  const formattedPrice = formatPrice(subTotal);

  const navigate = useNavigate();

  const handleLoginFromCart = () => {
    setLinkTo("/cart");
    navigate("/login");
  };

  return (
    <div className="cart-page">
      <div className="cart-details">
        {basket.length === 0 && (
          <div className="cart-empty">
            <h2 className="primary-heading mb-12">Cart empty</h2>

            <Link to="/products" className="link-underlined">
              Add more products
            </Link>
          </div>
        )}

        {basket.length > 0 && (
          <>
            <div className="cart-overview">
              <h2 className="primary-heading pb-12 border-b-1">
                Shopping Cart
              </h2>

              <ol className="cart-product-list">
                {basket.map((product) => (
                  <li key={product.id} className="cart-product">
                    <div className="cart-img-box">
                      <img
                        src={product.thumbnail}
                        alt={product.title}
                        className="cart-product-img"
                      />
                    </div>
                    <div className="cart-product-info">
                      <h2 className="cart-title mb-4">{product.title}</h2>

                      <p className="text-sm text-green mb-12">
                        {product.availabilityStatus}
                      </p>

                      <SetQuantity product={product} />

                      <button
                        className="btn btn-outline btn-width-auto mt-10"
                        onClick={() => removeFromBasket(product.id)}>
                        <span className="material-symbols-outlined cart-icon">
                          delete_forever
                        </span>
                        Delete
                      </button>
                    </div>

                    <div className="cart-product-price">
                      {formatPrice(product.price)}
                    </div>
                  </li>
                ))}
              </ol>
            </div>
            <div className="cart-pricing">
              <h3 className="subtotal mb-12">
                Subtotal ({getTotalBasketQuantity(basket)} items):{" "}
                <strong>{formattedPrice}</strong>
              </h3>
              {user ? (
                ""
              ) : (
                <button
                  onClick={handleLoginFromCart}
                  className="link-underlined mb-12 d-block btn">
                  Login first to continue to checkout
                </button>
              )}
              <button
                disabled={user ? false : true}
                onClick={() => navigate("/checkout")}
                className="btn btn-primary">
                Proceed to checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartPage;
