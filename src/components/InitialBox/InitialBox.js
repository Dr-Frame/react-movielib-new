import React, { useEffect, useState } from "react";
import "./InitialBox.scss";
import { motion } from "framer-motion";

const blackBox = {
  initial: {
    height: "100vh",
    bottom: 0,
  },
  animate: {
    height: 0,
    transition: {
      duration: 5,
      ease: [0.87, 0, 0.13, 1],
    },
  },
};

export default function InitialBox() {
  const [isInitialBoxWasShowed, setIsInitialBoxWasShowed] = useState(false);

  const handleInitialBoxShow = () => {
    setIsInitialBoxWasShowed(true);
  };

  useEffect(() => {
    handleInitialBoxShow();
  }, []);

  return (
    <>
      {!isInitialBoxWasShowed && (
        <div
          className="InitialBox"
          style={{
            backgroundColor: "black",
            zIndex: 20,
          }}
        >
          <motion.div
            className="InitialBox__inner"
            initial="initial"
            animate="animate"
            variants={blackBox}
          ></motion.div>
        </div>
      )}
    </>
  );
}
