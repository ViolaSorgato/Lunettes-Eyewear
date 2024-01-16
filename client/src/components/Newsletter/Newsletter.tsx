import { Send } from "@mui/icons-material";
import { Button, Input } from "@mui/material";
import "./Newsletter.css";

const Newsletter = () => {
  return (
    <div className="newsletter-container">
      <h1 className="title">Newsletter</h1>
      <h3 className="desc">Get timely updates from your favorite products.</h3>
      <div className="input-container">
        <Input className="input" placeholder="Your email" />
        <Button className="button">
          <Send />
        </Button>
      </div>
    </div>
  );
};

export default Newsletter;
