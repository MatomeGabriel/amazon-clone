import React, { useContext } from "react";
import { US } from "country-flag-icons/react/3x2";
import Logo from "../assets/amazon-dark+(1).svg.jpg";

import "./NavBar.css";
import { Link } from "react-router";
import ShoppingContext from "../context/ShoppingContext";
import { logout } from "../authService";
const NavBar = () => {
  const { basket, user } = useContext(ShoppingContext);

  const handleSignOut = async () => {
    await logout();
  };
  return (
    <nav className="nav d-flex">
      <Link to="/home" className="logo">
        <img src={Logo} alt="" />
      </Link>
      <a href="#" className="deliver d-flex">
        <span className="material-symbols-outlined deliver-icon">
          location_on
        </span>
        <div className="deliver-details d-flex flex-column">
          <span className="deliver-label">Deliver to</span>
          <span className="deliver-country">South Africa</span>
        </div>
      </a>

      <div className="search-form d-flex">
        <button className="nav-btn btn-search-select">
          <span className="">All</span>
          <span className="material-symbols-outlined btn-search-select-icon">
            arrow_drop_down
          </span>
        </button>

        <input
          className="search-input"
          type="text"
          placeholder="Search Amazon"
        />
        <button className="nav-btn btn-search d-flex">
          <span className="material-symbols-outlined btn-search-icon">
            search
          </span>
        </button>
      </div>
      <a href="#" className="language d-flex">
        <US title="United States" className="language-flag" />
        <span className="language-label">EN</span>
        <span className="material-symbols-outlined  language-icon">
          arrow_drop_down
        </span>
      </a>

      <Link
        onClick={
          !user
            ? () => {
                return;
              }
            : handleSignOut
        }
        to={user ? null : "/login"}
        className="login-in d-flex flex-column">
        <span className="login-in-greeting">
          Hello{" "}
          {user
            ? user?.displayName || user?.email.slice(0, 8) + "..."
            : "Guest, sign in"}{" "}
        </span>
        <div className="login-in-details d-flex">
          <span className="login-in-account-list">Account & List</span>
          <span className="material-symbols-outlined  language-icon">
            arrow_drop_down
          </span>
        </div>
      </Link>
      <a href="" className="return-order d-flex flex-column">
        <span className="return">Return</span>
        <span className="order"> & Orders</span>
      </a>

      <Link to={"/cart"} className="cart d-flex">
        <div className="cart-icon d-flex">
          <span className="material-symbols-outlined cart-shop-icon">
            shopping_cart
          </span>
          {basket.length > 0 && (
            <span className="cart-items-number">{basket.length}</span>
          )}
        </div>
        <span className="cart-label">cart</span>
      </Link>
    </nav>
  );
};

export default NavBar;
