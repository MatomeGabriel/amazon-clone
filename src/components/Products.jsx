import React from "react";
import Product from "./Product";

import "./Products.css";
const Products = ({ products }) => {
  return (
    <ol className="products">
      {products?.map((product) => (
        <Product key={product.id} data={product} />
      ))}
    </ol>
  );
};

export default Products;
