import React, { useContext } from "react";
import StarRating from "./StarRating";
import { Link } from "react-router";
import ProductPrice from "./ProductPrice";
import ShoppingContext from "../context/ShoppingContext";

import "./Product.css";
import SetQuantity from "./SetQuantity";

const Product = ({ data, limited }) => {
  const { basket } = useContext(ShoppingContext);
  const productInBasket = basket.find((item) => item.id === data.id);
  const isProductInBasket = Boolean(productInBasket);
  const { addToBasket } = useContext(ShoppingContext);
  const {
    thumbnail: src,
    price,
    discountPercentage,
    title,
    rating,
    reviews,
    shippingInformation,
    stock,
    id,
  } = data;
  return (
    <li className="product">
      <Link to={`/product/${id}`} className="product-img-box">
        <img src={src} alt="" className="product-img" />
      </Link>
      <div className="product-details">
        <h2 className="secondary-heading">
          <Link to={`/product/${id}`}>{title}</Link>
        </h2>

        <div className="product-rating">
          <StarRating rating={rating} ratingCount={reviews.length} />
          {/* <span className="text-md">50+ bought in past month</span> */}
        </div>

        <ProductPrice
          price={price}
          discount={discountPercentage}
          limited={limited}
        />

        <div className="product-delivery">
          FREE delivery
          <span className="text-bolded"> {shippingInformation}</span>
        </div>

        <div className="text-danger text-md mt-2">
          {stock < 5 &&
            stock > 0 &&
            " Less than 4 left in stock (more on the way)."}
          {stock === 0 && "Out of stock"}
        </div>
        {!isProductInBasket && (
          <button
            onClick={() => {
              addToBasket({ ...data, basketQuantity: 1 });
            }}
            className="btn btn-width-auto btn-primary mt-12"
            disabled={stock === 0 ? true : false}>
            Add to Basket
          </button>
        )}

        {isProductInBasket && (
          <div className="mt-12">
            <SetQuantity product={productInBasket} />
          </div>
        )}
      </div>
    </li>
  );
};

export default Product;
