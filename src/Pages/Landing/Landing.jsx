import React from "react";
import Carousel from "../../Components/Carousel/Carousel";
import Category from "../../Components/Category/Category";
import Product from "../../Components/Product/Product";
import Layout from "../../Components/Layout/Layout";
const Landing = () => {
  return (
    <Layout>
      <Carousel />
      <Category />
      <Product />
    </Layout>
  );
};

export default Landing;
