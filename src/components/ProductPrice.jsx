import React from "react";

import "./ProductPrice.css";
const ProductPrice = ({ limited = false, price, discount }) => {
  let prevPrice = 0;
  if (discount > 5) prevPrice = (price + (price * discount) / 100).toFixed(2);

  return (
    <div className="price">
      {limited && (
        <div className="product-limited-label">Limited time offer</div>
      )}
      <div className="product-price">
        <span className="current-product-price-big">
          <sup>R</sup>
          {parseInt(price)}
          <sup>{`${price}`.split(".")[1]}</sup>
        </span>
        {discount > 5 && (
          <span className="previous-product-price">
            List :<del>R{prevPrice}</del>
          </span>
        )}
      </div>
    </div>
  );
};

export default ProductPrice;

// <div className="product-slider-price"><span class="product-slider-current-price"><sup>R</sup>6988<sup>00</sup></span><span class="product-slider-previous-price">List :<del>R7 999,00</del></span></div>
