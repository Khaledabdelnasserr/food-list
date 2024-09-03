// FoodItem.jsx
import React, { useContext } from 'react';
import './FoodItem.css';
import add_to_cart from '../../assets/icons/icon-add-to-cart.svg';
import { StoreContext } from '../context/StoreContext';

const FoodItem = ({ id, name, img, price, category }) => {
    const { cartItems, addToCart, removeFromCart, borderedImages } = useContext(StoreContext);

    const handleAddToCart = () => {
        addToCart(id);
    };

    const handleRemoveFromCart = () => {
        removeFromCart(id);
    };

    return (
        <div className={`food-item ${borderedImages.has(id) ? 'border-none' : ''}`}>
            <div className='food-item-img-container'>
                <img
                    className={`food-item-image ${borderedImages.has(id) ? 'bordered' : ''}`}
                    src={img}
                    alt={name}
                />
                <div className="cart-button-container">
                    {!cartItems[id] ? (
                        <button
                            onClick={handleAddToCart}
                            className="add-to-cart-button"
                        >
                            <img className="cart-icon" src={add_to_cart} alt="Add to Cart" />
                            Add to Cart
                        </button>
                    ) : (
                        <div className="quantity-controls">
                            <button
                                onClick={handleRemoveFromCart}
                                className="quantity-button"
                            >
                                -
                            </button>
                            <span className="quantity-display">{cartItems[id]}</span>
                            <button
                                onClick={handleAddToCart}
                                className="quantity-button"
                            >
                                +
                            </button>
                        </div>
                    )}
                </div>
            </div>
            <div className="food-item-info">
                <div className="food-item-name">
                    <p className='food-item-category'>{category}</p>
                    <p className='name'>{name}</p>
                    <p className='food-item-price'>${price}</p>
                </div>
            </div>
        </div>
    );
};

export default FoodItem;
