import React from 'react'
import classes from "./Catagories.module.css";
import { Link } from 'react-router-dom';
function Catagoriescard({data}) {
  return (
    <div className={classes.category}>
      <Link to={`/category/${data.name}`}>
        <span>
          <h2>{data.title}</h2>
        </span>
        <img src={data.imgLink} alt="" />
        <p>shop now</p>
      </Link>
    </div>
  );
  }

export default Catagoriescard