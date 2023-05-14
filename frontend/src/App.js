import {useEffect, useState} from "react";
import $ from "jquery";
import "./App.css";
import axios from "axios";
import {connect} from "react-redux";
import {fetchProducts} from "./store/action/products.action";
import {Routes, Route} from 'react-router-dom';
import AddProduct from "./screens/AddProduct/AddProduct";
import Products from "./screens/Products/Products";

function App(props) {

    useEffect(() => {
        props.fetchProducts();
    }, []);

  return (
      <div className="App">
          <Routes>
              <Route exact path={'/'} element={<Products />} />
              <Route exact path={'/add-product'} element={<AddProduct />} />
          </Routes>
      </div>
  );
}

export default connect(null, {fetchProducts}) (App);