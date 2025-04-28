import React, { useContext, useState } from "react";

import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { db } from "../firebase";

import { Link } from "react-router";
import "./CheckoutPage.css";

import shoppingContext from "../context/ShoppingContext";
import instance from "../axios";
import { useEffect } from "react";
import { collection, doc, setDoc } from "firebase/firestore";

const CheckoutPage = () => {
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const stripe = useStripe();
  const elements = useElements();
  const {
    basket,
    user,
    getBasketTotal,
    formatPrice,
    getTotalBasketQuantity,
    navigate,
    emptyBasket,
  } = useContext(shoppingContext);

  const amount = getBasketTotal(basket);
  const amountCents = parseInt(amount * 100);
  const formattedAmount = formatPrice(amount);
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (!user) navigate("/login");
    }, 3000);

    return () => clearTimeout(timeoutId);
  }, [navigate, user]);

  const handlePayment = async (e) => {
    e.preventDefault();
    // Start processing
    setProcessing(true);

    try {
      // const res = axios.post("/payments/create", { amount: 1000 });
      const res = await instance.post("/payments/create", {
        amount: amountCents,
      });
      const clientSecret = await res.data.clientSecret;

      const payload = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      console.log(payload.paymentIntent.id);

      if (PaymentResponse.error) {
        setError(`Payment failed: ${payload.error.message}`);
        setProcessing(false);
      } else {
        setSuccess(true);
        setError(null);
        setProcessing(false);
        console.log(user);
        const orderRef = doc(
          collection(doc(collection(db, "user"), user?.uid), "orders"),
          payload.paymentIntent.id
        );

        console.log(payload.paymentIntent);
        await setDoc(orderRef, {
          basket: basket,
          amount: payload.paymentIntent.amount,
          created: payload.paymentIntent.created,
        });
      }
    } catch (error) {
      console.error(error);
      setError("An error occurred during payment.");
      setProcessing(false);
    } finally {
      alert("Order Successfully Placed 🎉");
      emptyBasket();
      navigate("/orders");
    }
  };

  return (
    <div className="checkout-page">
      <div className="checkout-details">
        <div className="checkout-info border-b-1 pb-12">
          <p className="checkout-number">1</p>
          <p className="checkout-title">Delivery Address</p>
          <p className="checkout-address">
            John Doe 123 Main Street Apartment 4B New York, NY 10001 United
            States Phone: +1 555-123-4567
          </p>
        </div>
        <div className="d-flex flex-column width-50">
          <p className="checkout-title mb-12 width-50 mt-8">Payment Details</p>
          <div className="checkout-form">
            <form onSubmit={handlePayment}>
              <CardElement />

              <button
                className="btn btn-primary"
                disabled={processing || success || !user || amount === 0}>
                {processing ? "Processing..." : `Pay ${formattedAmount}`}
                {/* {success && !processing && "Payment Successful"} */}
              </button>
              {amount === 0 && (
                <Link className="text-sm link d-block mt-12" to="/products">
                  Add product to cart to checkout
                </Link>
              )}

              {error && <div>{error}</div>}
            </form>
          </div>
        </div>
      </div>

      <div className="checkout-summary">
        <h1 className="primary-heading">Order Summary</h1>
        <table className="table">
          <tbody>
            <tr className="mb-12">
              <td className="checkout-table">
                <span>Number of Items</span>
              </td>
              <td className="checkout-table">
                <Link className="link-underlined" to="/cart">
                  {getTotalBasketQuantity(basket)} items
                </Link>
              </td>
            </tr>
            <tr>
              <td className="checkout-table">
                <span className="checkout-order">Order Total</span>
              </td>
              <td className="checkout-table">
                <span className="checkout-price">{formattedAmount}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CheckoutPage;
