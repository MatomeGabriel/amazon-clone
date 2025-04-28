import { Route, Routes } from "react-router";
import HomePage from "./layout/HomePage.jsx";
import ProductsPage from "./layout/ProductsPage.jsx";
import ProductPage from "./layout/ProductPage.jsx";
import Account from "./layout/Account.jsx";
import PageNotFound from "./layout/PageNotFound.jsx";
import "./App.css";
import Register from "./layout/Register.jsx";
import SignIn from "./layout/SignIn.jsx";
import CartPage from "./layout/CartPage.jsx";

import NavBar from "./components/Navbar.jsx";
import { useContext, useEffect } from "react";
import ShoppingContext from "./context/ShoppingContext.js";
import { auth } from "./firebase.js";
import CheckoutPage from "./layout/CheckoutPage.jsx";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import OrderPage from "./layout/OrderPage.jsx";
const stripePromise = loadStripe(
  "pk_test_51Qz17w4QxoouRz2P2pzT6pSXOsCtA3WjbkXxkzELxoJd99nw4pCGF1Rubp1ARKlshJGlbnSaScZTY6TuMoThR3tv00z4XJdaga"
);

const App = () => {
  const { setUser } = useContext(ShoppingContext);

  useEffect(() => {
    auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
    });
    // return () => unsubscribe();
  }, []);

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="home" element={<HomePage />} />
        <Route path="products/:category" element={<ProductsPage />} />
        <Route path="products/" element={<ProductsPage />} />
        <Route path="product/:id" element={<ProductPage />} />
        <Route path="account" element={<Account />} />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<SignIn />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="orders" element={<OrderPage />} />
        <Route
          path="checkout"
          element={
            <Elements stripe={stripePromise}>
              {" "}
              <CheckoutPage />
            </Elements>
          }
        />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
};

export default App;
