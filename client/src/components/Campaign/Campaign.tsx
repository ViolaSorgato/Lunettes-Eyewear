import { NavLink } from "react-router-dom";
import "./Campaign.css";

//Renders the main campaign banner, title leads to shop

const Campaign = () => {
  return (
    <div className="campaign-container">
      <div className="campaign-info">
        <NavLink
          to="/shop"
          className="nav-link"
          style={{ textDecoration: "none" }}
        >
          <p>Discover the </p>
          <h3>Summer Collection</h3>
          <h3>2024</h3>
        </NavLink>
      </div>
    </div>
  );
};

export default Campaign;
