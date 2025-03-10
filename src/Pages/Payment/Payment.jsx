import React, { useContext, useState } from "react";
import styles from "./Payment.module.css";
import Layout from "../../Components/Layout/Layout";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import ProductCard from "../../Components/Product/ProductCard";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import CurrencyFormat from "../../Components/CurrencyFormat/CurrencyFormat";
import { axiosInstance } from "../../API/axios";
import { ClipLoader } from "react-spinners";

import { db } from "../../Utility/firebase";
import { useNavigate, useLocation } from "react-router-dom";
import { Type } from "../../Utility/action.type";
const Payment = () => {
  const [{ user, basket }, dispatch] = useContext(DataContext);
  const totalItem = basket?.reduce((amount, item) => {
    return item.amount + amount;
  }, 0);
  const total = basket.reduce((amount, item) => {
    return item.price * item.amount + amount;
  }, 0);

  const [processing, setProcessing] = useState(false);
  const [cardError, setCardError] = useState(null);
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const navStateData = useLocation();
  // console.log(navStateData);
  const handleChange = (e) => {
    e.error?.message ? setCardError(e.error.message) : setCardError("");
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    try {
      setProcessing(true);

      // Backend: Contact to the client secret
      const response = await axiosInstance({
        method: "post",
        url: `/payment/create?total=${total * 100}`,
      });

      const clientSecret = response.data?.clientSecret;

      // Confirm client side
      const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      // After confirmation: Save order to Firestore and clear the basket

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
      // empty basket
      dispatch({ type: Type.EMPTY_BASKET });
      setProcessing(false);
      navigate("/orders", { state: { msg: "You have placed new Order!" } });
    } catch (error) {
      console.log(error);
      setProcessing(false);
    }
  };

  return (
    <Layout>
      {/* Header */}
      <div className={styles.paymentHeader}>Checkout ({totalItem}) items</div>
      {/* Payment Method */}
      <section className={styles.paymentMethod}>
        {/* Address */}
        <div className={styles.flex}>
          <h3>Delivery Address</h3>
          <div>
            <div>{user?.email}</div>
            <div>123 React Lane</div>
            <div>Ethiopia, IL</div>
          </div>
        </div>
        <hr />
        {/* Product */}
        <div className={styles.flex}>
          <h3>Review items and delivery</h3>
          <div>
            {basket?.map((item) => (
              <ProductCard key={item.id} product={item} flex={true} />
            ))}
          </div>
        </div>
        <hr />
        {/* Card Form */}
        <div className={styles.flex}>
          <h3>Payment Method</h3>
          <div className={styles.paymentCard}>
            <div className={styles.paymentDetails}>
              <form action="" onSubmit={handlePayment}>
                {cardError && (
                  <small style={{ color: "red" }}>{cardError}</small>
                )}
                {/* Card Element */}
                <CardElement onChange={handleChange} />
                {/* Price */}
                <div className={styles.paymentPrice}>
                  <div>
                    <span>
                      Total Order | {totalItem} <br />
                      <strong>
                        <CurrencyFormat amount={total} />
                      </strong>
                    </span>
                  </div>
                  <button type="submit">
                    {processing ? (
                      <div className={styles.loader}>
                        <ClipLoader color="gray" size={15} />
                        <p>Please Wait ...</p>
                      </div>
                    ) : (
                      "Pay Now"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Payment;
