import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import StripeCheckout from 'react-stripe-checkout';
import { stripePublic } from '../../dev';

import { getItems } from '../../state/actions/items';
import { addToCart, removeFromCart, purchase } from '../../state/actions/cart';

class Cart extends Component {
  componentDidMount() {
    this.props.getItems();
  }

  constructor(props) {
    super(props);
    this.makePayment = this.makePayment.bind(this);
  }

  handleChange(e) {}

  makePayment(token) {
    this.props.purchase(token);
  }
  render() {
    return (
      <div className='cart'>
        <h1>Cart</h1>
        {this.props.cartTotal === 0 ? (
          <h3>Cart Is Empty</h3>
        ) : (
          <div> you have {this.props.cartTotal} items in cart</div>
        )}
        {this.props.cartTotal !== 0 && (
          <div>
            <ul>
              {this.props.cartItems.map((item) => (
                <li key={item._id}>
                  <p className='cart-item-name'>
                    {item.name} x {item.count}
                  </p>
                  <button
                    className='btn-red'
                    value={item._id}
                    onClick={(e) => this.props.removeFromCart(e.target.value)}>
                    X
                  </button>
                  <button
                    name='increment'
                    onClick={(e) => this.handleChange(e)}>
                    +
                  </button>
                  <button
                    name='decrement'
                    onClick={(e) => this.handleChange(e)}>
                    -
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
        <div className='f-co-c-c'>
          <h1>Stripe</h1>
          <StripeCheckout
            stripeKey={stripePublic}
            token={this.makePayment}
            name='Purchase'
            amount={this.props.cartCost * 100}>
            <button className='btn btn-red'>Check Out</button>
          </StripeCheckout>
          <button className='btn btn-black'>
            <Link to='/cart'>Back to Cart</Link>
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cartTotal: state.cartReducer.cartTotal,
    items: state.itemsReducer.items,
    cartItems: state.cartReducer.cartItems,
    cartCost: state.cartReducer.cartCost,
  };
};

export default connect(mapStateToProps, {
  addToCart,
  removeFromCart,
  getItems,
  purchase,
})(Cart);
