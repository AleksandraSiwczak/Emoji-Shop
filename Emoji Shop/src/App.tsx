import "./App.css";

import { useEffect, useState } from "react";
import { Details } from "./Details";
import { CartItems } from "./CartItems";
import { BrowserRouter, NavLink } from "react-router-dom";
import { Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import {Summary} from "./Summary";
export type Price = {
  value: number;
  currency: 'PLN';
};
export type Product = {
  id: number;
  item: string;
  price: Price;
  name: string;
};

const App = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProductId, setSelectedProductId] = useState<null | number>(
    null
  );

  const [cart, setCart] = useState<Product[]>([]);
  // const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3000/products.json")
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }, []);

  const toggleDetailsList = (id: number) => {
    setSelectedProductId((oldId) => (oldId === id ? null : id));
  };

  const addToCart = (product: Product) => {
    setCart((cartProducts) => [...cartProducts, product]);
  };

  const clearCart = () => {
    setCart([])
  }

  const removeFromCart = (productIndex: number) => {
    setCart((products) => {
      const updatedProducts = [...products];
      updatedProducts.splice(productIndex, 1);
      return updatedProducts;
    });
  };

  return (
    <BrowserRouter>
      <div className="Page">
        <div className="Header">
          <div className="React-Shop-Header">
            <header>React Emoji Shop</header>
          </div>
          <div className="Cart">
            
            <p> {cart.length}</p>

            <NavLink to="/cart">
              <img
                src="https://github.githubassets.com/images/icons/emoji/unicode/1f6d2.png"
                alt="cart"
              />
            </NavLink>
            
            <NavLink to="/summary"> 
            <button className="Summary">Summary</button>
            </NavLink>
          </div>
        </div>
        <div className="Content">
          <Routes>
            <Route
              path="/"
              element={
                <ul className="xxx">
                  {products.map((product) => {
                    const { id, name } = product;
                    const isExpanded = selectedProductId === product.id;
                    return (
                      <li key={id}>
                        <div className="Item">
                          <div className="ItemName">{name}</div>
                          <div className="Button">
                            <button onClick={() => toggleDetailsList(id)}>
                              {!isExpanded ? "Show details" : "Hide details"}
                            </button>
                            <button onClick={() => addToCart(product)}>
                              Add to cart
                            </button>
                          </div>
                        </div>
                        {isExpanded && <Details product={product} />}
                      </li>
                    );
                  })}
                </ul>
              }
            />
            <Route
              path="/cart"
              element={
                
                  <CartItems
                    products={cart}
                    removeProduct={removeFromCart}
                    addProduct={addToCart}
                  />
                
              }
            />
            <Route path="/summary" element={<Summary products={cart} onClear={clearCart} />}></Route>
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
