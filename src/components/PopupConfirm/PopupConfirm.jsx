// PopupConfirm.jsx
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import './PopupConfirm.css';
import { StoreContext } from '../context/StoreContext';
import success from '../../assets/icons/icon-order-confirmed.svg'

const PopupConfirm = ({ onClose, cartItems, products, totalAmount }) => {
    const { resetCart, setBorderedImages } = useContext(StoreContext);

    const handleStartNewOrder = () => {
        resetCart(); // Reset the cart items
        setBorderedImages(new Set()); // Reset the border state
        onClose(); // Close the popup
    };

    return (
        <div className="popup-confirm-overlay">
            <div className="popup-confirm-container">
                <div className='button-close'>
                    <img src={success} alt="" />
                </div>
                <div className='head-info'>
                    <h2>Order Confirmed</h2>
                    <p>Wh hope you enjoy your food!</p>
                </div>
                <div className="confirm-order-summary">
                    {products.map((item) => {
                        if (cartItems[item._id] > 0) {
                            return (
                                <div key={item._id} className='item-info'>
                                    <div className='img-title-container'>
                                        <div className='img-info'>
                                            <img src={item.img} alt="" />
                                        </div>
                                        <div className='item-info-title'>
                                            <h3>{item.name}</h3>
                                            <p className='price-x'>{cartItems[item._id]}x<span className='span'>
                                                @ ${item.price}</span></p>
                                        </div>
                                        <div className='total-order-popup'>
                                            <p>${item.price * cartItems[item._id]}</p>
                                        </div>
                                    </div>
                                </div>
                            );
                        }
                        return null;
                    })}
                    <div className='popup-total-price'>
                        <p className='p-o'>Order Total</p>
                        <p>${totalAmount}</p>
                    </div>
                </div>
                <button onClick={handleStartNewOrder} className="start-new-order-button">Start New Order</button>
            </div>
        </div>
    );
};

PopupConfirm.propTypes = {
    onClose: PropTypes.func.isRequired,
    cartItems: PropTypes.object.isRequired,
    products: PropTypes.arrayOf(PropTypes.shape({
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        category: PropTypes.string,
        img: PropTypes.string
    })).isRequired,
    totalAmount: PropTypes.number.isRequired,
};

export default PopupConfirm;
