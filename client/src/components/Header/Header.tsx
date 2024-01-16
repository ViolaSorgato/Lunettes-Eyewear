import Navbar from "../../components/Navbar/Navbar";
import Promo from "../../components/Promo/Promo";

const Header = () => {
  return (
    <div className="header-container">
      <Promo />
      <Navbar />
    </div>
  );
};

export default Header;
