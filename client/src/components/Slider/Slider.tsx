import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import "./Slider.css";
import { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";

const images = [
  "https://images.pexels.com/photos/735273/pexels-photo-735273.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.pexels.com/photos/701877/pexels-photo-701877.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.pexels.com/photos/947885/pexels-photo-947885.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.pexels.com/photos/1499481/pexels-photo-1499481.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.pexels.com/photos/370472/pexels-photo-370472.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.pexels.com/photos/343720/pexels-photo-343720.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.pexels.com/photos/1435405/pexels-photo-1435405.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.pexels.com/photos/1669595/pexels-photo-1669595.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.pexels.com/photos/1864848/pexels-photo-1864848.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.pexels.com/photos/2229930/pexels-photo-2229930.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
];

const variants: Variants = {
  initial: (direction) => {
    return {
      x: direction > 0 ? 500 : -500,
      opacity: 0,
    };
  },

  animate: {
    x: 0,
    opacity: 1,
    transition: {
      x: { type: "spring", stiffness: 300, damping: 20 },
    },
  },

  exit: (direction) => {
    return {
      x: direction > 0 ? -500 : 500,
      opacity: 0,
    };
  },
};

export default function Banner() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  function nextStep() {
    setDirection(1);
    if (index === images.length - 1) {
      setIndex(0);
      return;
    }
    setIndex(index + 1);
  }

  function prevStep() {
    setDirection(-1);
    if (index === 0) {
      setIndex(images.length - 1);
      return;
    }
    setIndex(index - 1);
  }

  return (
    <div className="bannerContainer">
      <div className="slideshow">
        <AnimatePresence initial={false} custom={direction}>
          <motion.img
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            src={images[index]}
            alt="slides"
            className="slides"
            key={images[index]}
            custom={direction}
          />
        </AnimatePresence>

        <button className="prevBtn" onClick={prevStep}>
          <ArrowBackIosIcon />
        </button>
        <button className="nextBtn" onClick={nextStep}>
          <ArrowForwardIosIcon />
        </button>
      </div>
    </div>
  );
}
