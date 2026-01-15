import CartLayout from '../containers/Cart/CartLayout';
import { useCart } from '../hooks/useCart';
import './Cart.css';

function Cart() {
  const cart = useCart();

  if (cart.loading) {
    return (
      <div className="cart-page">
        <div className="cart-container">
          <h1>Loading...</h1>
        </div>
      </div>
    );
  }

  return <CartLayout {...cart} />;
}

export default Cart;
