import React, { useState } from "react";
import { FaArrowCircleUp } from "react-icons/fa";
import { CgArrowUpR } from "react-icons/cg";
import "./ScrollArrow.scss";

const ScrollArrow = () => {
  const [showScroll, setShowScroll] = useState(false);

  const checkScrollTop = () => {
    if (!showScroll && window.pageYOffset > 400) {
      setShowScroll(true);
    } else if (showScroll && window.pageYOffset <= 400) {
      setShowScroll(false);
    }
  };

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  window.addEventListener("scroll", checkScrollTop);

  return (
    <CgArrowUpR
      className="scrollTop"
      onClick={scrollTop}
      style={{ height: 40, display: showScroll ? "block" : "none" }}
    />
  );
};

export default ScrollArrow;
