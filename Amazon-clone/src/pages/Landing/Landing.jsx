import React from 'react'
import LayOut from '../../componet/LayOut/LayOut';
import Carousel from "../../componet/carousel/CarouselEffect"; 
import Category from "../../componet/Category/Category";
import Product from "../../componet/product/Product";
function Landing() {
  return (
    <LayOut>
      <Carousel />
      <Category />
      <Product />
    </LayOut>
  );
}

export default Landing