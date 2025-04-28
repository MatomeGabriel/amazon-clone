import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import axios from "axios";

import Card from "../components/Card";
import "./HomePage.css";
import Products from "../components/Products";

const HomePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingCategoriesTwo, setIsLoadingCategoriesTwo] = useState(false);
  const [isLoadingDealOne, setIsLoadingDealOne] = useState(false);
  const [dealOneProducts, setDealOneProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoriesTwo, setCategoriesTwo] = useState([]);

  useEffect(() => {
    const endPoints = [
      "https://dummyjson.com/products/category/beauty?limit=1",
      "https://dummyjson.com/products/category/fragrances?limit=1",
      "https://dummyjson.com/products/category/furniture?limit=1",
      "https://dummyjson.com/products/category/groceries?limit=1",
      "https://dummyjson.com/products/category/home-decoration?limit=1",
      "https://dummyjson.com/products/category/kitchen-accessories?limit=1",
      "https://dummyjson.com/products/category/laptops?limit=1",
      "https://dummyjson.com/products/category/mens-shirts?limit=1",
    ];
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const responses = await Promise.all(
          endPoints.map((endpoint) => axios.get(endpoint))
        );

        const results = responses.map((res) => res.data);
        const combinedProducts = results.flat();
        setCategories(() => combinedProducts);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  // Fetch single products from different categories to display them later
  useEffect(() => {
    const endPoints = [
      "https://dummyjson.com/products/category/mens-shoes?limit=1",
      "https://dummyjson.com/products/category/mens-watches?limit=1",
      "https://dummyjson.com/products/category/mobile-accessories?limit=1",
      "https://dummyjson.com/products/category/motorcycle?limit=1",
      "https://dummyjson.com/products/category/skin-care?limit=1",
      "https://dummyjson.com/products/category/smartphones?limit=1",
      "https://dummyjson.com/products/category/sports-accessories?limit=1",
      "https://dummyjson.com/products/category/sunglasses?limit=1",
    ];
    const fetchData = async () => {
      setIsLoadingCategoriesTwo(true);
      try {
        const responses = await Promise.all(
          endPoints.map((endpoint) => axios.get(endpoint))
        );

        const results = responses.map((res) => res.data);

        const combinedProducts = results.flat();

        setCategoriesTwo(() => combinedProducts);
        setIsLoadingCategoriesTwo(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoadingDealOne(true);

      try {
        const res = await axios.get(
          "https://dummyjson.com/products/category/sports-accessories?limit=8"
        );

        const products = res.data.products;
        setDealOneProducts(() => products);
        setIsLoadingDealOne(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="home">
      <div className="slider">
        <img
          className="slider-img"
          src="https://m.media-amazon.com/images/I/71LN86MkblL._SX3000_.png"
          alt=""
        />
      </div>
      <div className="home-layout">
        <div className="row">
          {!isLoading &&
            categories?.map((obj, index) => (
              <Card key={index} data={obj.products[0]} />
            ))}

          {isLoading && <p>Loading....</p>}
        </div>

        <div className="row">
          <div className="products-slider">
            <div className="product-slider-title">
              <h2 className="">Today's deals</h2>
            </div>
            <ol className="products-slider-container">
              {!isLoadingDealOne && <Products products={dealOneProducts} />}
              {isLoadingDealOne && <p>Loading...</p>}

              <Link
                to="/products"
                className="btn btn-width-auto btn-outline mt-12 btn-text-center">
                View all products
              </Link>
            </ol>
          </div>
        </div>

        <div className="row">
          {!isLoadingCategoriesTwo &&
            categoriesTwo?.map((obj, index) => (
              <Card key={index} data={obj.products[0]} />
            ))}

          {isLoadingCategoriesTwo && <p>Loading....</p>}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
