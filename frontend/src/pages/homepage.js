import React from "react";

import Header2 from "../components/header2";
import Carousel from "../components/carousel";
import Featuredproducts from "../components/Featuredproducts";

//RENDERING COMPONENTS

const Homepage = () => {
  return (
    <>
      <Header2 />
      <Carousel />
      <Featuredproducts />
    </>
  );
};

export default Homepage;
