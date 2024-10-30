import React from "react";
import numeral from "numeral";
const Cformat = ({ amount }) => {
    const formatamount = numeral(amount).format("$0.0,00")
   return <div>{formatamount}</div>; 
};
export default Cformat; 