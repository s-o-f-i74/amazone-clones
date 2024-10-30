import React,{useState,useEffect} from 'react'
import classes from "./Result.module.css";
import LayOut from "../../componet/LayOut/LayOut";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { productUrl } from "../../Api/Endpoints";
import ProductCard from '../../componet/product/ProductCard';
import Loader from '../../componet/Loader/Loader';

function Result() {
   const [results, setresults] = useState([]);
   const [isLoading, setisLoading] = useState(false);
  const {categoryName}=useParams()
  useEffect(() => {
    setisLoading(true)
  axios
    .get(`${productUrl}/products/category/${categoryName}`)
    .then((res) => {
      
      setresults(res.data);
      setisLoading(false)
    })
    .catch((err) => {
      console.log(err);
      setisLoading(false)
    });
  }, [])
 
  return (
    <LayOut>
      <section>
        <h1 style={{ padding: "30px" }}>Results</h1>
        <p style={{ padding: "30px" }}>category / {categoryName}</p>
        <hr />
        {isLoading ? (
          <Loader />
        ) : (
          <div className={classes.product_container}>
            {results?.map((product) => (
              <ProductCard
                key={product.id}
                renderAdd={true}
                product={product}
                renderDesc={false}
              />
            ))}
          </div>
        )}
      </section>
    </LayOut>
  );
}

export default Result