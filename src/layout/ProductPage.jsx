import React, { useState, useEffect, useContext } from "react";
import StarRating from "../components/StarRating";
import "./ProductPage.css";
import { Link, useParams } from "react-router";
import ProductPrice from "../components/ProductPrice";
import ShoppingContext from "../context/ShoppingContext";
import axios from "axios";

const ProductPage = () => {
  const [product, setProduct] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState("");
  const [selectedValue, setSelectedValue] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const { addToBasket, navigate } = useContext(ShoppingContext);

  // const productExists = productExists(product);

  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get(`https://dummyjson.com/products/${id}`);

        const data = res.data;
        setProduct(() => data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (isLoading) return <p>Loading....</p>;
  const {
    images = [],
    title = null,
    brand = null,
    rating = null,
    price = null,
    weight = null,
    description = null,
    shippingInformation = null,
    availabilityStatus,
  } = product;

  const handleSelectChange = (e) => {
    setSelectedValue(() => e.target.value);
  };

  const handleSelectImage = (index) => {
    setSelectedImage(() => index);
  };

  return (
    <div className="product-page">
      <div className="product-imgs">
        <div className="product-imgs-container">
          <div className="product-thumbnails">
            {images?.map((img, index) => (
              <button
                onMouseEnter={() => handleSelectImage(index)}
                key={index + title}
                className="btn btn-product-thumbnail">
                <img src={img} alt="" className="product-thumbnail" />
              </button>
            ))}
          </div>

          <div className="product-img-container">
            <img src={images[selectedImage]} alt="" className="product-img" />
            <div className="button btn btn-share"></div>
          </div>
        </div>
      </div>
      <div className="product-detail-container">
        <h1 className="primary-heading">{title}</h1>
        <Link className="link">Brand: {brand}</Link>
        <div className="">
          <StarRating allInfo={true} rating={rating} />
        </div>

        <span className="text-sm border-b-1 mb-8">
          50+ bought in past month
        </span>

        <div className="mt-14 mb-8">
          <ProductPrice price={price} />
        </div>

        <span className="text-md">All prices include VAT.</span>
        <div className="features mt-10 pb-14 border-b-1">
          <div className="feature">
            <span className="material-symbols-outlined feature-icon">
              delivery_truck_speed
            </span>
            <span className="feature-text">Free delivery</span>
          </div>

          <div className="feature">
            <span className="material-symbols-outlined feature-icon">
              box_edit
            </span>

            <span className="feature-text">Returns Policy</span>
          </div>

          <div className="feature">
            <span className="material-symbols-outlined feature-icon">
              shield_locked
            </span>
            <div className="feature-text">Secure </div>
          </div>
        </div>
        <div className="product-details-table mt-18 mb-8 border-b-1">
          <table className="table">
            <tbody>
              {/*   1 */}
              {/* <tr>
                <td className="td-top-left">
                  <span className="text-bolded text-md">Colour</span>
                </td>
                <td className="td-top-right">
                  <span className="text-md">Multicolor</span>
                </td>
              </tr> */}
              <tr>
                <td className="td-left">
                  <span className="text-bolded text-md">Brand</span>
                </td>
                <td className="td-right">
                  <span className="text-md">{brand}</span>
                </td>
              </tr>
              {/* <tr>
                <td className="td-left">
                  <span className="text-bolded text-md">Material</span>
                </td>
                <td className="td-right">
                  <span className="text-md">Aluminum</span>
                </td>
              </tr> */}
              <tr>
                <td className="td-bottom-left">
                  <span className="text-bolded text-md">Item Weight</span>
                </td>
                <td className="td-bottom-right">
                  <span className="text-md">{weight}kg</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="product-info mt-14 mb-16">
          <h3 className="tertiary-heading mb-4">About this item </h3>
          <p className="text-md">{description}</p>
          {/* <ul className="unordered-list">
            <li className="list-item text-md">
              Safe for use with butane gas stoves, lamps and heaters{" "}
            </li>
            <li>Long lasting fuel source </li>
            <li>Store in cool and dry conditions </li>
          </ul> */}
        </div>
        <div className="report-issues">
          <span className="material-symbols-outlined icon-small">comment</span>
          <Link className="link"> Report an issue with this product</Link>
        </div>
      </div>

      {/* NOWWW */}
      <div className="product-order-details">
        <div className="mb-4">
          <ProductPrice price={price} />
        </div>

        <div className="delivery-details">
          <span className="text-md d-block mb-12">
            <Link className="link-underlined">FREE delivery</Link>
            <span className="text-bolded"> {shippingInformation} </span>
            <Link className="link-underlined">Details</Link>
          </span>
        </div>
        <div className="location">
          <span className="material-symbols-outlined location-icon">
            location_on
          </span>
          <button className="btn btn-text">
            Delivering to Johannesburg 2188 - Update location
          </button>
        </div>
        <p className="in-stock">{availabilityStatus}</p>
        <div className="order">
          <div className="order-input-group">
            <label htmlFor="select">Quantity</label>
            <select
              className="order-select"
              name="Quantity"
              id="select"
              value={selectedValue}
              onChange={handleSelectChange}>
              {Array(5)
                .fill(null)
                .map((_, index) => (
                  <option key={"ccd" + index} value={index + 1}>
                    {index + 1}
                  </option>
                ))}
            </select>
          </div>
          {}
          <button
            onClick={() =>
              addToBasket({ ...product, basketQuantity: selectedValue })
            }
            className="btn btn-primary mt-8">
            Add to Basket
          </button>
          <button
            onClick={() => {
              addToBasket({ ...product, basketQuantity: selectedValue });
              navigate("/cart");
            }}
            className="btn btn-secondary mt-8">
            Buy Now
          </button>
        </div>

        <div className="shipping-info-table mt-12">
          <table className="p-4">
            <tbody>
              <tr>
                <td>
                  <span className="text-sm text-light">Ships from</span>
                </td>
                <td>
                  <span className="text-sm">Amazon.com</span>
                </td>
              </tr>

              <tr>
                <td>
                  <span className="text-sm text-light">Sold by</span>
                </td>
                <td>
                  <span className="text-sm">Amazon.com</span>
                </td>
              </tr>

              <tr>
                <td>
                  <span className="text-sm text-light">Payment</span>
                </td>
                <td>
                  <span className="text-sm text-blue text-cursor">
                    Secure transaction
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="add-gift mt-12 border-b-1 pb-12">
          <input id="check" type="checkbox" />
          <label className="" htmlFor="check">
            Add gift options
          </label>
        </div>

        <button className="btn btn-outline mt-12">Add to List</button>
      </div>
    </div>
  );
};

export default ProductPage;
