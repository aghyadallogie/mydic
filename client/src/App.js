import "./App.css";
import { Login } from "./components/Login";
import { Register } from "./components/Register";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./components/Home";

const App = () => {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
