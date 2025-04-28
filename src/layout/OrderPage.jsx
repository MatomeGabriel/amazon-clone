import React, { useEffect, useState } from "react";
import { useNavigate, useLocation, Link } from "react-router"; // If using React Router

const OrderPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Assuming the order data is passed via state during navigation
  const [order, setOrder] = useState(location.state?.order || null);

  //   useEffect(() => {
  //     if (!order) {
  //       // If no order details are found, redirect back to products page
  //       navigate("/");
  //     }
  //   }, [order, navigate]);

  return (
    <div className="order-container">
      <h1>Thank you for your purchase!</h1>
      <p className="mt-10">Your order is in transit </p>
      <Link to="/products" className="link-underlined d-block mt-12">
        Order more products
      </Link>
    </div>
  );
};

export default OrderPage;
