import React, { useContext, useEffect, useState } from 'react';
import FoodItem from '../FoodItems/FoodItem';
import gray_cak from '../../assets/icons/illustration-empty-cart.svg';
import { StoreContext } from '../context/StoreContext';
import carbon_neutral from '../../assets/icons/icon-carbon-neutral.svg';
import PopupConfirm from '../PopupConfirm/PopupConfirm';
import './MainPage.css';

const MainPage = () => {
    const { cartItems, removeFromCart, getTotalCartAmount, items } = useContext(StoreContext);
    const [products, setProducts] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [removeBorders, setRemoveBorders] = useState(false);

    const totalItems = products.reduce((sum, item) => {
        return sum + (cartItems[item._id] || 0);
    }, 0);

    useEffect(() => {
        setProducts(items);
    }, [items]);

    const handleConfirmOrderClick = () => {
        setShowPopup(true);
    };

    const handleClosePopup = () => {
        setShowPopup(false);
    };

    const handleStartNewOrder = () => {
        setRemoveBorders(true);
        setShowPopup(false);
    };

    return (
        <div className='main'>
            <h1>Deserts</h1>
            <div className='food-display'>
                <div className='food-display-list'>
                    {products.map((product, index) => (
                        <FoodItem
                            key={index}
                            name={product.name}
                            category={product.category}
                            price={product.price}
                            img={product.img}
                            id={product._id}
                            removeBorder={removeBorders}
                        />
                    ))}
                </div>
                <div className='flex'>
                    <h2>Your Cart ({totalItems})</h2>
                    {totalItems > 0 ? (
                        <>
                            {products.map((item, index) => (
                                cartItems[item._id] > 0 && (
                                    <div key={item._id} className='cart-items'>
                                        <div className='cart-items-title cart-items-item'>
                                            <div className='item-name'>
                                                <p>{item.name}</p>
                                            </div>
                                            <div className='item-price'>
                                                <p className='price-x'>{cartItems[item._id]}x</p>
                                                <p className='item-p'>@ ${item.price}</p>
                                                <p className='item-p'>${item.price * cartItems[item._id]}</p>
                                            </div>
                                        </div>
                                        <div>
                                            <p id='x' onClick={() => removeFromCart(item._id)}>X</p>
                                        </div>
                                    </div>
                                )
                            ))}
                            <div className='confirm'>
                                <div className='total-order'>
                                    <p>Order Total</p>
                                    <p>${getTotalCartAmount()}</p>
                                </div>
                                <div className='button-confirm'>
                                    <p><img src={carbon_neutral} alt="" />This is a <strong>carbon-neutral </strong>delivery</p>
                                    <button onClick={handleConfirmOrderClick} className='confirm-order'>Confirm Order</button>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className='empty-item'>
                            <div className='empty-info'>
                                <img src={gray_cak} alt="" />
                                <p>Your added items will appear here</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            {showPopup && <PopupConfirm onClose={handleClosePopup} handleStartNewOrder={handleStartNewOrder} cartItems={cartItems} products={products} totalAmount={getTotalCartAmount()} />}
        </div>
    );
};

export default MainPage;
