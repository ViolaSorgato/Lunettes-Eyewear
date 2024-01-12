import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/homepage/HomePage";
import Confirmationpage from "./pages/confirmationpage/ConfirmationPage";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="confirmation" element={<Confirmationpage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
