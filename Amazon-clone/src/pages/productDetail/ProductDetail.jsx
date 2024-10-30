import React, { useEffect, useState } from "react";
import classes from "./ProductDetail.module.css";
import LayOut from "../../componet/LayOut/LayOut";
import { useParams } from "react-router-dom";
import axios from "axios";
import ProductCard from "../../componet/product/ProductCard";

import { productUrl } from "../../Api/Endpoints";
import Loader from "../../componet/Loader/Loader";
function ProductDetail() {
  const { productId } = useParams();
   console.log(productId);
  const [products, setproducts] = useState({});
  const [isLoading, setisLoading] = useState(false);
  useEffect(()=>{
    setisLoading(true);
    axios
      .get(`${productUrl}/products/${productId}`)
      .then((res)=>{
        console.log(res);
        setproducts(res.data);
        setisLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setisLoading(false);
      });
  }, []);
  console.log(products);
  return (
    <LayOut>
      {isLoading ? (
        <Loader />
      ) : (
        <ProductCard
          product={products}
          flex={true}
          renderDesc={true}
          renderAdd={true}
        />
      )}
    </LayOut>
  );
}

export default ProductDetail;
