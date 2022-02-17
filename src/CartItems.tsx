import "./App.css";
import "./index.css";
import "./CartItems.css";
import type { Product } from "./App";
import { NavLink } from "react-router-dom";


 




type Props = {
  products: Product[];
  removeProduct: (productId: string) => void;
  addProduct: (product: Product) => void;
};

export const CartItems = ({ products, removeProduct, addProduct }: Props) => {
  return (
    <div className="CartContent">
      <div className="CartItems">
        {products.map((product, index) => {
          return (
            <div className="ItemsInCart" key={index}>
              {product.price.value / 100} {product.price.currency}
              {product.item}
              
              <button className="CartButton" onClick={() => removeProduct(product.id)}>-</button>
              <button className="CartButton" onClick={() => addProduct(product)}>+</button>
              </div>
              
            
          );
        })}
      </div>
      
       
        <NavLink to="/summary">
            <button className="Summary">Summary</button>
          </NavLink>
        <NavLink to="/">
          <button>Back to shop </button>
        </NavLink>

      </div>
     
  
  );
};
