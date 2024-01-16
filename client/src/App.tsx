import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/homepage/HomePage";
import Confirmationpage from "./pages/confirmationpage/ConfirmationPage";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import "./App.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { themeOptions } from "./components/ThemeOptions";

const theme = createTheme(themeOptions);

const App = () => {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="confirmation" element={<Confirmationpage />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
};

export default App;
