import React, { useContext } from "react";
import { FaSearch } from "react-icons/fa";
import { BiCart } from "react-icons/bi";
import styles from "./Header.module.css";
import LowerHeader from "./LowerHeader";
import { Link } from "react-router-dom";
import { DataContext } from "../DataProvider/DataProvider";
import {auth} from '../../Utility/firebase'
const Header = () => {
  const [{ basket, user }, dispatch] = useContext(DataContext);
  const totalItem = basket?.reduce((amount, item) => {
    return item.amount + amount;
  },0);
  return (
    <section className={styles.fixed}>
      <section className={styles.header_container}>
        <div className={styles.logo_container}>
          <Link to="/">
            <img
              src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
              alt="Amazon logo"
            />
          </Link>
          <div className={styles.delivery}>
            {/* deliver */}
            <span>{/* icon */}</span>
            <div>
              <p>Delivered to</p>
              <span>Ethiopia</span>
            </div>
          </div>
        </div>

        <div className={styles.search}>
          {/* Search */}
          <select name="" id="">
            <option value="">All</option>
          </select>
          <input type="search" name="" id="" placeholder="search product" />
          <FaSearch size={38} />
          {/* icon */}
        </div>

        <div className={styles.order_container}>
          <Link to="" className={styles.language}>
            <img
              src="https://pngimg.com/uploads/flags/small/flags_PNG14592.png"
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
                  <span onClick={()=>auth.signOut()}>Sign Out</span>
                </>
              ) : (
                <>
                
                <p>Sign In</p>
                <span>Account & Lists</span>
                </>
              )}
            </div>
          </Link>
          <Link to="/orders">
            <p>Returns</p>
            <span>& Orders</span>
          </Link>
          <Link to="/cart" className={styles.cart}>
            <BiCart size={35} />
            <span>{totalItem}</span>
          </Link>
        </div>
      </section>
      <LowerHeader />
    </section>
  );
};

export default Header;
