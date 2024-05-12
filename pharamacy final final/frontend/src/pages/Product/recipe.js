//not using










import React from "react";
import { useShoppingCartStore } from "./ShoppingCart";

const Recipe = () => {
    const { cartItems} = useShoppingCartStore();

    return(
        <>
        <div>
            <h2>Recipe</h2>
            
        </div>
        </>
    )

}