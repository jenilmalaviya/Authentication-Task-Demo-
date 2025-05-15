import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Landing from "./pages/Landing";
import AdminRegister from "./pages/AdminRegister";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
         <Route path="/admin/register" element={<AdminRegister />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
