import React, { useContext } from "react";
import Rating from "@mui/material/Rating";
import CurrencyFormat from "../CurrencyFormat/CurrencyFormat";
import { Link } from "react-router-dom";
import styles from "./Product.module.css";
import { DataContext } from "../DataProvider/DataProvider";
import { Type } from "../../Utility/action.type";
const ProductCard = ({ product, flex, renderDesc,renderAdd }) => {
  const { id, image, title, price, rating, description } = product;

  const [state, dispatch] = useContext(DataContext);
  const addToCart = () => {
    dispatch({
      type: Type.ADD_TO_BASKET,
      item: {
        image,
        title,
        id,
        rating,
        price,
        description,
      },
    });
  };

  return (
    <div
      className={`${styles.card_container} ${
        flex ? styles.product_flexed : ""
      }`}
    >
      <Link to={`/products/${id}`}>
        <img src={image} alt="" />
      </Link>
      <div>
        <h3>{title}</h3>
        {renderDesc && <div style={{ maxWidth: "500px" }}>{description}</div>}
        <div className={styles.rating}>
          {/* rating */}
          {/* {product.rating.rate} */}
          <Rating value={rating?.rate} precision={0.1} />
          {/*rating counter  */}
          {/* {product.rating.count} */}
          <small>{rating?.count}</small>
        </div>
        <div>
          {/* price */}
          <CurrencyFormat amount={price} />
        </div>
        {renderAdd && (
          <button className={styles.button} onClick={addToCart}>
            add to cart
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
