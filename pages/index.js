import React from "react";
import { App, Hero } from "../components";

const index = (props) => {
  return (
    <div className="h-full w-full">
      <Hero />
      <App {...props} showLoadingButton={true} />
    </div>
  );
};

export default index;
