import React, { useContext, useEffect, useState } from "react";
import classes from "./order.module.css";
import LayOut from "../../componet/LayOut/LayOut";
import { db } from "../../Utility/Firebase";
import { DataContext } from "../../componet/DataProvider/DataProvider";
import { BsSnapchat } from "react-icons/bs";
import ProductCard from "../../componet/product/ProductCard";
function Orders() {
  const [{ user }, dispatch] = useContext(DataContext);
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    if (user) {
      db.collection("users")
        .doc(user.uid)
        .collection("orders")
        .orderBy("created", "desc")
        .onSnapshot((snapchot) => {
          console.log(snapchot);
          setOrders(
            snapchot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          );
        });
    } else {
      setOrders([]);
    }
  }, []);

  return (
    <LayOut>
      <section className={classes.container}>
        <div className={classes.orders__container}>
          <h2>Your orders</h2>
          {orders?.length == 0 && <div style={{padding:"20px"}}>you don't have order yet.</div>}
          <div>
            {orders?.map((eachOrder, i) => {
              return (
                <div key={i}>
                  <hr />
                  <p>Order ID:{eachOrder?.id}</p>
                  {eachOrder?.data?.basket?.map((orders) => {
                    return (
                      <ProductCard
                        flex={true}
                        product={orders}
                        key={orders.id}
                      />
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </LayOut>
  );
}

export default Orders;
