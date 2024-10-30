import React, { useContext, useState } from "react";
import classes from "./Payment.module.css";
import LayOut from "../../componet/LayOut/LayOut";
import { DataContext } from "../../componet/DataProvider/DataProvider";
import ProductCard from "../../componet/product/ProductCard";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import Cformat from "../../componet/cformat/Cformat";
import { ClipLoader } from "react-spinners";
import { axiosInstance } from "../../Api/Axios";
import { db } from "../../Utility/Firebase";
import { useNavigate } from "react-router-dom";
import { Type } from "../../Utility/action.type";
function Payment() {
  const [{ user, basket },dispatch] = useContext(DataContext);
  const totalItem = basket?.reduce((amount, item) => {
    return item.amount + amount;
  }, 0);

  const total = basket.reduce((amount, item) => {
    return item.price * item.amount + amount;
  }, 0);
  const [cardError,setCardError] = useState(null);
  const [processing,setProcessing] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate()
  const handleChange = (e) => {
    console.log(e);
    e?.error?.message ? setCardError(e?.error?.message) : setCardError("");
  };

  // aditional
  //
  const handlePayment = async (e) => {
    e.preventDefault();

    try {
      // backend ...contact to client secret
      // const response = await axios({
      //   method: "POST",
      //   url: /payment/create?total=${total * 100},
      // });
     setProcessing(true);
      const response = await axiosInstance({
        method: "POST",
       url: `/payment/create?total=${total*100}`,
    });
      console.log(response.data);
      const clientSecret = response.data?.clientSecret;
      // react side confirmation
      const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });
      console.log(paymentIntent);

      await db
        .collection("users")
        .doc(user.uid)
        .collection("orders")
        .doc(paymentIntent.id)
        .set({
          basket: basket,
          amount: paymentIntent.amount,
          created: paymentIntent.created,
        });

        dispatch({ type: Type.EMPTY_BASKET});

      setProcessing(false);
      navigate("/order",{state:{msg:"you have placed new order"}});
    } catch (error) {
      console.log(error);
      setProcessing(false);
    }
  };
  // aditional
  return (
    <LayOut>
      <div className={classes.Payment__header}>
        Checkout ({totalItem}) items
      </div>
      <section className={classes.Payment}>
        <div className={classes.flex}>
          <h3> Delivery Address</h3>
          <div>
            <div>{user?.email}</div>
            <div>123 React Lane</div>
            <div>chicago, IL</div>
          </div>
        </div>
        <hr />
        <div className={classes.flex}>
          <h3>Review items and delivery</h3>
          <div>
            {basket?.map((item) => (
              <ProductCard product={item} flex={true} />
            ))}
          </div>
        </div>
        <hr />
        <div className={classes.flex}>
          <h3>payment methods</h3>
          <div className={classes.Payment__card__container}>
            <div className={classes.Payment__detailes}>
              <form onSubmit={handlePayment}>
                {cardError && (
                  <small style={{ color: "red" }}>{cardError}</small>
                )}
                <CardElement onChange={handleChange} />
                <div className={classes.Payment__price}>
                  <div>
                    <span style={{ display: "flex", gap: "10px" }}>
                      <p> Total order | </p>
                      <Cformat amount={total} />
                    </span>
                  </div>
                  <button type="submit">
                    {processing ? (
                      <div className={classes.loading}>
                        <ClipLoader color="gray" size={12} />
                        <p>please wait ...</p>
                      </div>
                    ) : (
                      "pay Now"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </LayOut>
  );
}

export default Payment;
