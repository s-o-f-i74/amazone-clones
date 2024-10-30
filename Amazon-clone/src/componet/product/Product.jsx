import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";
import classes from "./Product.module.css";
import Loader from "../Loader/Loader";

function Product() {
  const [product, setproduct] = useState([]);
   const [isLoading, setisLoading] = useState(false);
  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")

      .then((res) => {
        setproduct(res.data);
         setisLoading(false)
      })
      .catch((err) => {
        console.log(err);
        setisLoading(false)
      });
  }, []);

  return (
    <>
      {isLoading? (
        <Loader />
      ) : (
        <section className={classes.product_container}>
          {product?.map((singleproduct) => {
            return (
              <ProductCard
                renderAdd={true}
                product={singleproduct}
                key={singleproduct.id}
              />
            );
          })}
        </section>
      )}
    </>
  );
}

export default Product;
