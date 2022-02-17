import "./App.css";
import "./index.css";

import { useEffect, useState } from "react";
import { Details } from "./Details";
import { CartItems } from "./CartItems";
import { BrowserRouter, NavLink } from "react-router-dom";
import { Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import { Summary } from "./Summary";
import { getProducts } from "./db";
export type Price = {
  value: number;
  currency: "PLN";
};
export type Product = {
  id: string;
  item: string;
  price: Price;
  name: string;
};

const App = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProductId, setSelectedProductId] = useState<null | string>(
    null
  );

  const [cart, setCart] = useState<Product[]>([]);
  // const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    getProducts().then((data) => setProducts(data));
  }, []);

  const toggleDetailsList = (id: string) => {
    setSelectedProductId((oldId) => (oldId === id ? null : id));
  };

  const addToCart = (product: Product) => {
    setCart((cartProducts) => [...cartProducts, product]);
  };

  const clearCart = () => {
    setCart([]);
  };

  const removeFromCart = (productId: string) => {
    setCart((products) => {
      const productIndex = products.findIndex(product=> product.id === productId)
      const updatedProducts = [...products];
      updatedProducts.splice(productIndex, 1);
      return updatedProducts;
    });
  };

  

  return (
    <BrowserRouter>
      <div className="Container">
        <div className="Nav">
          <div className="ReactShopHeader">
            <h1>React Emoji Shop</h1>
          </div>
          <div className="Navigation">
            <p> {cart.length}</p>

            <NavLink to="/cart">
              <img
                src={
                  process.env.PUBLIC_URL +
                  "/iconmonstr-shopping-cart-thin-240.png"
                }
                alt="cart"
              />
            </NavLink>
          </div>
        </div>
        <div className="Content">
          <Routes>
          <Route
              path="/"
              element={
                <ul className="Products">
                  {products.map((product) => {
                    const { id, name } = product;
                    const isExpanded = selectedProductId === product.id;
                    return (
                      <li key={id}>
                        
                          <div className="ItemName">{name}{product.item}</div>
                          <div className="Button">
                            <button onClick={() => toggleDetailsList(id)}>
                              {!isExpanded ? "Show details" : "Hide details"}
                            </button>
                            <button onClick={() => addToCart(product)}>
                              Add to cart
                            </button>
                         
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
            <Route
              path="/summary"
              element={<Summary products={cart} onClear={clearCart} />}
            ></Route>
          </Routes>
        </div>
        <div className="Footer">
          <p>Created by Aleksandra Siwczak</p>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
