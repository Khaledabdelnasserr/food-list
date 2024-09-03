// StoreContext.jsx
import { createContext, useState } from "react";
import items from "../../assets/data";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    const [cartItems, setCartItems] = useState({});
    const [borderedImages, setBorderedImages] = useState(new Set());

    const addToCart = (itemId) => {
        if (!cartItems[itemId]) {
            setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
        } else {
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
        }
        setBorderedImages((prev) => new Set(prev).add(itemId));
    };

    const removeFromCart = (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
        if (cartItems[itemId] <= 1) {
            setBorderedImages((prev) => {
                const newSet = new Set(prev);
                newSet.delete(itemId);
                return newSet;
            });
        }
    };

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = items.find((product) => product._id === item);
                totalAmount += itemInfo.price * cartItems[item];
            }
        }
        return totalAmount;
    };

    const resetCart = () => {
        setCartItems({});
        setBorderedImages(new Set());
    };

    const contextValue = {
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        items,
        getTotalCartAmount,
        resetCart,
        borderedImages, // Add borderedImages to the context
        setBorderedImages // Provide a setter for borderedImages
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;
