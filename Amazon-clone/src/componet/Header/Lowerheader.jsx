import React from 'react'
import { TiThMenu } from "react-icons/ti";
import classes from "./Header.module.css";

function Lowerheader() {
  return (
    <div className={classes.lower__container}>
      <ul>
        <li>
          <TiThMenu />
          <p>All</p>
        </li>
        <li>Today's Deals</li>
        <li> Costumer Service</li>
        <li>Registry</li>
        <li>Gift Cards</li>
        <li>Sell</li>
      </ul>
    </div>
  );
}

export default Lowerheader