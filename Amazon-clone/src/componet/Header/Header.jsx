import React from 'react'
import classes from "./Header.module.css"
// import { FaSearch } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { BsSearch } from "react-icons/bs";
import { SlLocationPin } from "react-icons/sl";
import { BiCart } from "react-icons/bi";
import Lowerheader from "./Lowerheader"
import { useContext } from 'react';
import { DataContext } from '../DataProvider/DataProvider';
import {auth} from "../../Utility/Firebase"

function Header() {
  const[{user,basket},dispatch]=useContext(DataContext)
  const totalItem =basket?.reduce((amount,item)=>{
    return item.amount + amount
  },0)

  return (
    <section className={classes.fixed}>
      <section>
        <div className={classes.header__container}>
          <div className={classes.logo__container}>
            <Link to="/">
              <img
                src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
                alt="amazon log"
              />
            </Link>
            <div className={classes.delivery}>
              <span>
                <SlLocationPin />
              </span>
              <div>
                <p>Delivered to</p>
                <span>Ethiopia</span>
              </div>
            </div>
          </div>

          <div className={classes.search}>
            <select name="" id="">
              <option value="">All</option>
            </select>
            <input type="text" />
            <BsSearch size={38} />
          </div>

          <div className={classes.order__container}>
            <Link to="" className={classes.language}>
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Flag_of_the_United_States_%28DoS_ECA_Color_Standard%29.svg/1920px-Flag_of_the_United_States_%28DoS_ECA_Color_Standard%29.svg.png"
                alt=""
              />
              <select name="" id="">
                <option value="">EN</option>
              </select>
            </Link>

            <Link to={!user && "/auth"}>
              <div>
                {user ? (
                  <>
                    <p>Hello {user?.email?.split("@")[0]}</p>
                    <span onClick={()=>auth.signOut()}>sign out</span>
                  </>
                ) : (
                  <>
                    <p> Hello,Sign In</p>
                    <span>Account & Lists</span>
                  </>
                )}
              </div>

             
            </Link>

            <Link to="/order">
              <p>returns</p>
              <span>& Orders</span>
            </Link>

            <Link to="/cart" className={classes.cart}>
              <BiCart size={35} />
              <span>{totalItem}</span>
            </Link>
          </div>
        </div>
      </section>
      <Lowerheader />
    </section>
  );
}

export default Header