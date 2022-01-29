import "./App.css";
// import { useState } from "react";
import type { Product } from "./App";
import { NavLink } from "react-router-dom";

type Props = {
  products: Product[];
  removeProduct: (index: number) => void;
  addProduct: (product: Product) => void;
};

export const CartItems = ({ products, removeProduct, addProduct }: Props) => {
  return (
    <div className="CartContent">
     
      {products.map((product, index) => {
        return (
          <div className="CartItems" key={index}>
          
              {" "}
              {product.price.value / 100} {product.price.currency}
              {product.item}{" "}
              <div className="CartButtons">
              <button onClick={() => removeProduct(index)}>remove</button>
              <button onClick={() => addProduct(product)}>add</button>
            </div>
          </div>
        );
      })}

      <div>
        <p>
          Totall price:{" "}
          {products
            .map((product) => product.price.value)
            .reduce((a, b) => a + b, 0) / 100}
          {"PLN"}
        </p>
      </div>
      <NavLink to="/">
        <button>Back to shop </button>
      </NavLink>
    </div>
  );
};
