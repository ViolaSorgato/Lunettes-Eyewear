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
import ProductDetails from "./components/ProductDetails/ProductDetails";
import LoginPage from "./pages/loginpage/LoginPage";
import UserProvider from "./context/user.context";
import RegisterPage from "./pages/registerpage/RegisterPage";
import AdminProducts from "./pages/admin/AdminProducts";
import AddNewProduct from "./pages/admin/AddNewProduct";
import AdminOrders from "./pages/admin/AdminOrders";
import { OrderProvider } from "./context/order.context";
import MyOrders from "./pages/myorderspage/MyOrders";
import GlassesPage from "./pages/glassespage/GlassesPage";
import SunglassesPage from "./pages/sunglassespage/SunglassesPage";

const theme = createTheme(themeOptions);

//This is where I handle both Providers and Routes
const App = () => {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <OrderProvider>
          <UserProvider>
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
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/adminproducts" element={<AdminProducts />} />
                    <Route path="/addnewproduct" element={<AddNewProduct />} />
                    <Route path="/adminorders" element={<AdminOrders />} />
                    <Route path="/myorders" element={<MyOrders />} />
                    <Route path="/shop/glasses" element={<GlassesPage />} />
                    <Route
                      path="/shop/sunglasses"
                      element={<SunglassesPage />}
                    />
                  </Routes>
                  <Footer />
                </BrowserRouter>
              </ProductProvider>
            </ShoppingCartProvider>
          </UserProvider>
        </OrderProvider>
      </ThemeProvider>
    </div>
  );
};

export default App;
