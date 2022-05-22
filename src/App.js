import "./server/build/server";
import * as React from "react";
import { Routes, Route, Link } from "react-router-dom";
import { extendTheme, ChakraProvider } from "@chakra-ui/react";
import Menu from "./Components/Menu";
import Home from "./Components/Home";
import Products from "./Components/Products/Products";
import ProductsForm from "./Components/Products/ProductsForm";
import Product from "./Components/Products/Product";
import Provider from "./Components/Providers/Provider";
import Providers from "./Components/Providers/Providers";
import ProvidersForm from "./Components/Providers/ProvidersForm";
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
            {/*Products*/}
            <Route path="/products" element={<Products />} />
            <Route path="/products/add" element={<ProductsForm />} />
            <Route path="/products/:id" element={<Product />} />
            <Route
               path="/products/:id/edit"
               element={<ProductsForm type="edit" />}
            />
            {/*Providers*/}
            <Route path="/providers" element={<Providers />} />
            <Route path="/providers/:id" element={<Provider />} />
            <Route path="/providers/add" element={<ProvidersForm />} />
            <Route path="/providers/:id/edit" element={<ProvidersForm type="edit" />} />
         </Routes>
      </ChakraProvider>
   );
}

export default App;
