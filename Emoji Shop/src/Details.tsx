import "./App.css"
import type { Product } from './App'

type Props = {
  product: Product
}
export const Details = ({ product}: Props) => {

  return (
    <div className="ItemDetailsCard">
	 
	  <div > {product.price.value / 100} {product.price.currency}{product.item}</div>
    </div>
  );
};

