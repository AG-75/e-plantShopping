import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

    const handleCheckoutShopping = (e) => {
  alert('Functionality to be added for future reference');
};

  // Calculate total amount for all products in the cart
  const calculateTotalAmount = (cart) => {
    let total = 0;

    cart.forEach(item => {
        // 1. Extract the numeric cost: removes '$' and parses to float.
        const unitPrice = parseFloat(item.cost.substring(1));
        
        // 2. Multiply unit price by quantity and add to total.
        total += item.quantity * unitPrice;
    });

    // Return the final sum formatted as a currency string.
    return total.toFixed(2);
};

 const handleContinueShopping = (e) => {
    // Call the callback function passed from the parent component.
    // This function will handle the navigation logic (e.g., routing to the main product page).
    if (onContinueShopping) {
        onContinueShopping(e);
    }
};


  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

 const handleDecrement = (item) => {
    if (item.quantity > 1) {
        // Case 1: Quantity > 1. Decrease by 1 using updateQuantity.
        dispatch(
            updateQuantity({ 
                name: item.name, 
                quantity: item.quantity - 1 
            })
        );
    } else {
        // Case 2: Quantity is 1. If decremented, it would drop to 0, so remove the item.
        dispatch(
            removeItem({ 
                name: item.name 
            })
        );
    }
};

  const handleRemove = (item) => {
    // Dispatch the removeItem action to delete the item from the cart.
    dispatch(
        removeItem({ 
            name: item.name 
        })
    );
};

  // Calculate total cost based on quantity for an item
const calculateTotalCost = (item) => {
    // 1. Extract the numeric unit price:
    //    item.cost.substring(1) removes the leading character (e.g., "$" from "$10.00").
    //    parseFloat converts the resulting string ("10.00") into a number (10.00).
    const unitPrice = parseFloat(item.cost.substring(1));
    
    // 2. Perform the multiplication.
    const subtotal = item.quantity * unitPrice;
    
    // 3. Return as a string formatted to two decimal places for currency display.
    return subtotal.toFixed(2);
};

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      <div>
        {cart.map(item => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>
              <div className="cart-item-quantity">
                <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
              </div>
              <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
              <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'></div>
      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={(e) => handleContinueShopping(e)}>Continue Shopping</button>
        <br />
        <button className="get-started-button1">Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;


