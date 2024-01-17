import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/homepage/HomePage";
import Confirmationpage from "./pages/confirmationpage/ConfirmationPage";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import "./App.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { themeOptions } from "./components/ThemeOptions";
import ProductPage from "./pages/productpage/ProductPage";
import ProductProvider from "./context/product.context";
import AboutUsPage from "./pages/aboutuspage/AboutUsPage";
import ShoppingCartProvider from "./context/cart.context";
import ProductDetails from "./components/ProductDetails/Productsdetails";

const theme = createTheme(themeOptions);

const App = () => {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <ShoppingCartProvider>
          <ProductProvider>
            <BrowserRouter>
              <Header />
              <Routes>
                <Route path="/about-us" element={<AboutUsPage />} />
                <Route path="/" element={<Homepage />} />
                <Route path="/shop" element={<ProductPage />} />
                <Route path="/:id" element={<ProductDetails />} />
                <Route path="confirmation" element={<Confirmationpage />} />
              </Routes>
              <Footer />
            </BrowserRouter>
          </ProductProvider>
        </ShoppingCartProvider>
      </ThemeProvider>
    </div>
  );
};

export default App;
