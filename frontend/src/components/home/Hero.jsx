import React from "react";
import HeroBG from "../../assets/HeroBG.jpg";

const Hero = () => {
  return (
    <div className="relative max-h-dvh w-full overflow-hidden">
      <img
        src={HeroBG}
        alt="Banner"
        className="w-full h-full object-fill min-h-100 sm:min-h-150"
      />
    </div>
  );
};

export default Hero;