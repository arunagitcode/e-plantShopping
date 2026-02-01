import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

function CartItem({ onContinueShopping }) {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items); // Get cart items from Redux

  // Calculate subtotal for one item
  const calculateTotalCost = (item) => {
    const costNumber = parseFloat(item.cost.substring(1)); // Remove "$" and convert to number
    return (costNumber * item.quantity).toFixed(2);
  };

  // Calculate total amount for all items
  const calculateTotalAmount = () => {
    let total = 0;
    cartItems.forEach(item => {
      const costNumber = parseFloat(item.cost.substring(1));
      total += costNumber * item.quantity;
    });
    return total.toFixed(2);
  };

  // Handle increment quantity
  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  // Handle decrement quantity
  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem(item.name));
    }
  };

  // Handle remove item completely
  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  // Handle continue shopping
  const handleContinueShopping = (e) => {
    e.preventDefault();
    onContinueShopping();
  };

  // Handle checkout (optional placeholder)
  const handleCheckoutShopping = (e) => {
    alert('Functionality to be added for future reference');
  };

  return (
    <div className="cart-container">
      <h2>Your Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <table className="cart-table">
            <thead>
              <tr>
                <th>Plant</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Subtotal</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item, index) => (
                <tr key={index}>
                  <td>
                    <img src={item.image} alt={item.name} className="cart-image" />
                    {item.name}
                  </td>
                  <td>{item.cost}</td>
                  <td>
                    <button onClick={() => handleDecrement(item)}>-</button>
                    <span className="quantity">{item.quantity}</span>
                    <button onClick={() => handleIncrement(item)}>+</button>
                  </td>
                  <td>${calculateTotalCost(item)}</td>
                  <td>
                    <button onClick={() => handleRemove(item)}>Remove</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="cart-summary">
            <h3>Total: ${calculateTotalAmount()}</h3>
            <button onClick={handleContinueShopping} className="continue-btn">Continue Shopping</button>
            <button onClick={handleCheckoutShopping} className="checkout-btn">Checkout</button>
          </div>
        </>
      )}
    </div>
  );
}

export default CartItem;
