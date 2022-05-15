import * as React from "react";
import { Routes, Route, Link } from "react-router-dom";

// 1. import `ChakraProvider` component
import { extendTheme, ChakraProvider } from "@chakra-ui/react";
import Menu from "./Components/Menu";
import Home from "./Components/Home";
import Products from "./Components/Products/Products";
import ProductsForm from "./Components/Products/ProductsForm";
import Product from "./Components/Products/Product";
const colors = {
   brand: {
      900: "#1a365d",
      800: "#153e75",
      700: "#2a69ac",
   },
};

const theme = extendTheme({ colors });

function App() {
   return (
      <ChakraProvider theme={theme}>
         <Menu />
         <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/add" element={<ProductsForm/>} />
            <Route path="/products/:id" element={<Product />} />
            <Route path="/products/:id/edit" element={<ProductsForm type="edit" />} />

         </Routes>
      </ChakraProvider>
   );
}

export default App;
