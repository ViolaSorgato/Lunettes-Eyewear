import { Send } from "@mui/icons-material";
import { Button, Input } from "@mui/material";
import "./Newsletter.css";

//This component does not have a function, it's just for the sake of realism.
const Newsletter = () => {
  return (
    <div className="news-container">
      <h1 className="news-title">Newsletter</h1>
      <h3 className="news-desc">
        Get timely updates from your favorite products.
      </h3>
      <div className="news-input-container">
        <Input
          className="news-input"
          id="news_input"
          placeholder="Your email"
        />
        <Button className="news-button">
          <Send />
        </Button>
      </div>
    </div>
  );
};

export default Newsletter;
