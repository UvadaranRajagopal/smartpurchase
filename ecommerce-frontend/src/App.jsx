import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login      from "./pages/Login";
import Register   from "./pages/Register";
import Home       from "./pages/Home";
import Products   from "./pages/Products";
import AddProduct from "./pages/AddProduct";
import Cart       from "./pages/Cart";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"            element={<Login />} />
        <Route path="/register"    element={<Register />} />
        <Route path="/home"        element={<Home />} />
        <Route path="/products"    element={<Products />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/cart"        element={<Cart />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
