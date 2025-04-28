import React from "react";
import { useState, useEffect } from "react";
import "./ProductsPage.css";
import { useParams } from "react-router";
import Product from "../components/Product";
import Products from "../components/Products";
import axios from "axios";

const ProductsPage = () => {
  const [products, setProducts] = useState(null);
  // const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { category } = useParams();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get(
          `https://dummyjson.com/products/${category ? "category/" : ""}${
            category ? category : ""
          }?limit=100`
        );
        const data = res.data;
        setIsLoading(false);
        setProducts(() => data.products);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProducts();
  }, [category]);

  return (
    <div className="products-page">
      <aside className="products-sidebar"></aside>
      <main className="products-main">
        <header className="products-header">
          {/* <img src="" className="products-header-img" /> */}
          <div className="products-header-info">
            <p className="products-header-text">
              {products?.length} results for
              <span className="products-header-text-bolded">
                {" "}
                {category ? category.toUpperCase() : "All products"}
              </span>
            </p>
          </div>
        </header>
        {isLoading && <p>Loading...</p>}
        {!isLoading && <Products products={products} />}
      </main>
    </div>
  );
};

export default ProductsPage;
