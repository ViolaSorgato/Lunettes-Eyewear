import { ArrowLeftOutlined, ArrowRightOutlined } from "@mui/icons-material";
import { Button, Container } from "@mui/material";
import { useState } from "react";
import sliderItems, { SliderItemType } from "../../assets/data";
import "./Slider.css";

const Slider = () => {
  const [slideIndex, setSlideIndex] = useState(0);

  const handleClick = (direction: string) => {
    if (direction === "left") {
      setSlideIndex(slideIndex > 0 ? slideIndex - 1 : sliderItems.length - 1);
    } else {
      setSlideIndex(slideIndex < sliderItems.length - 1 ? slideIndex + 1 : 0);
    }
  };

  return (
    <Container style={{ maxWidth: "100%" }} className="container">
      <div className="arrow-container left" onClick={() => handleClick("left")}>
        <ArrowLeftOutlined />
      </div>
      <div className="wrapper">
        {sliderItems.map((item: SliderItemType) => (
          <div className="slide" key={item.title}>
            <div className="img-container">
              <img className="img" src={item.image} alt={item.title} />
            </div>
            <div className="info-container">
              <h2 className="title">{item.title}</h2>
              <p className="desc">{item.description}</p>
              <Button>SHOW NOW</Button>
            </div>
          </div>
        ))}
      </div>
      <div
        className="arrow-container right"
        onClick={() => handleClick("right")}
      >
        <ArrowRightOutlined />
      </div>
    </Container>
  );
};

export default Slider;
