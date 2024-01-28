import Navbar from "../../components/Navbar/Navbar";
import Promo from "../../components/Promo/Promo";

//The Header component contains the Promo and the Navbar.
const Header = () => {
  return (
    <div className="header-container">
      <Promo />
      <Navbar />
    </div>
  );
};

export default Header;
