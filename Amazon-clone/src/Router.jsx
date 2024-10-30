import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing/Landing";

import Signup from "./pages/Auth/Signup";
import Payment from "./pages/payment/Payment";
import Orders from "./pages/orders/Orders";
import Cart from "./pages/cart/Cart";
import Result from "./pages/Result/Result";
import ProductDetail from "./pages/productDetail/ProductDetail";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import ProtectedRoute from "./componet/protectedRoute.jsx/ProtectedRoute";

const stripePromise = loadStripe(
  "pk_test_51Q2SXKGyZaHClHt6uquhn7W2JrQuwy0qJLCdZIPe5ogez0QJVBVOHjBtOILcQ0bXmCTezPVIm8LIKDvwzBkPfkiv006fHuqJuj"
);
function Routering() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auth" element={<Signup />} />
        <Route
          path="/payment"
          element={
            <ProtectedRoute
              msg={"you must log in to pay"}
              redirect={"/payment"}
            >
              <Elements stripe={stripePromise}>
                <Payment />
              </Elements>
            </ProtectedRoute>
          }
        />
        <Route
          path="/order"
          element={
            <ProtectedRoute
              msg={"you must log in to access your orders"}
              redirect={"/order"}
            >
              <Orders />
            </ProtectedRoute>
          }
        />
        <Route path="/category/:categoryName" element={<Result />} />
        <Route path="/product/:productId" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </Router>
  );
}

export default Routering;
