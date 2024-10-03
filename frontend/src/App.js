import ProductHome from "./components/ProductHome"
import Cart from "./components/Cart"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import ViewProduct from "./components/ViewProduct";
import AddProduct from "./components/AddProduct";
import DelProduct from "./components/DelProduct";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<ProductHome />} />
          <Route path="/product/:id" element={<ViewProduct />} />
          <Route path="/addproduct" element={<AddProduct/>}></Route>
          <Route path="/delproduct" element={<DelProduct/>}></Route>
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
