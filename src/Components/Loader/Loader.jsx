import React from "react";
import { PuffLoader } from "react-spinners";
const Loader = () => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "50vh",
      }}
    >
      <PuffLoader color="#FFA500" />
    </div>
  );
};

export default Loader;
