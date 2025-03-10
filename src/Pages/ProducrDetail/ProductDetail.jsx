import React, { useState, useEffect } from "react";
import styles from "./ProductDetail.module.css";
import Layout from "../../Components/Layout/Layout";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ProductUrl } from "../../API/endPoints";

import ProductCard from "../../Components/Product/ProductCard";
import Loader from "../../Components/Loader/Loader";
const ProductDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  // console.log(productId)
  useEffect(() => {
    setIsLoading(true);

    axios
      .get(`${ProductUrl}/products/${productId}`)
      .then((res) => {
        // console.log(res);
        setProduct(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, []);

  return (
    <Layout>
      {isLoading ? (
        <Loader />
      ) : (
        <ProductCard
          product={product}
          flex={true}
          renderDesc={true}
          renderAdd={true}
        />
      )}
    </Layout>
  );
};

export default ProductDetail;
