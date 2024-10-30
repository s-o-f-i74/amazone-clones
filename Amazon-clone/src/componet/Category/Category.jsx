import React from 'react'
import  categoryInfos  from "./Catagoriesfullimage";
import Catagoriescard from './Catagoriescard';
import classes from "./Catagories.module.css";

function Catagories() {
  return (
    <section className={classes.category__container}>
      {categoryInfos.map((infos) => (
        <Catagoriescard  data={infos} />
      ))}
    </section>
  );
}

export default Catagories
