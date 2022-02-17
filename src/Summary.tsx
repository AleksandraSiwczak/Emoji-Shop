import "./App.css"
import "./index.css"
import "./Summary.css"
import { NavLink } from "react-router-dom";
import { useState} from 'react';
import type { Product } from "./App";
// import { useEffect } from "react";

type Props = {
  products: Product[],
  onClear: () => void
}


type MakeGroupBy = (attrName: string) => <T extends {[key: string]: any }>(items: T[]) => {[key: string]: T[] }

const makeGroupBy: MakeGroupBy = (attrName) => (items) => {
	return items.reduce((acc, curr) => {
    const attr = curr[attrName];

		if (!acc[attr]) {
			acc[attr] = [];
		}

		acc[attr].push(curr);
		return acc;
	}, {} as {[key: typeof attrName]: typeof items});
};

export const Summary = ({ products, onClear }: Props) => {
  const [prankMessage, setPrankMessage] = useState<null | string>(null);

  // const newStuff = products.length > 0
  // useEffect(() => {
  //   if (newStuff) {
  //     setPrankMessage(null);
  //   }
    
  // }, [newStuff])
  
  const groupedItems = makeGroupBy("name")(products);
  // const x = [
  //   [
  //     'x_x', 
  //     [{ name: 'x_x', } ,{ name: 'x_x', }]
  //   ], 
  //   [
  //     'O_o', 
  //     [{ name: 'O_o'}, { name: 'O_o'}, { name: 'O_o'}]]
  //   ]
  
  const result = Object.entries(groupedItems).map(([, items]) => (
    <li className="ItemSummary" key={items[0].id}>
      {items[0].name} / {items.length}
    </li>
  ));
  const handleBuyNow = () => {
    // TODO - make firebase stuff
    onClear()
    setPrankMessage('Seriously? Did you really expect us to let you buy our emojis? Just copy them. ;)')
  }
  return (
    <div className="SummaryContent">
      
      {prankMessage && <p>{prankMessage}</p>}
      
      {!prankMessage && <div className="Result"><ol>{result} </ol></div>}
     
       <div className="Buttons">
      <NavLink to="/">
        <button className="BackToShopButton">Back to shop</button>
      </NavLink>
      
      <button className="PrankButton" onClick={handleBuyNow} disabled={products.length === 0}>Buy now</button>

      </div>
    </div>
  );
};
