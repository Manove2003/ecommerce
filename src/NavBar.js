import React, { Component } from "react";
import logo from "./assests/images/Brand icon.svg";
import addcart from "./assests/images/addcart.svg";
import itemimage from "./assests/images/product1.svg";
import { Link } from "react-router-dom";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCartOpen: false,
      activeLink: "",
      selectedColor: false,
    };

    this.toggleCart = this.toggleCart.bind(this);
  }

  handleLinkClick = (link) => {
    this.setState({ activeLink: link });
  };

  toggleCart() {
    this.setState((prevState) => ({
      isCartOpen: !prevState.isCartOpen,
    }));
  }
  calculateTotalPrice = () => {
    const { cart } = this.props;
    return cart.reduce((total, item) => total + item.price * item.count, 0);
  };

  render() {
    const { activeLink, isCartOpen } = this.state;
    const { cart, addToCart, removeFromCart } = this.props;
    return (
      <header className={`header ${isCartOpen ? "cart-open" : ""}`}>
        {isCartOpen && (
          <div className="overlay" onClick={this.toggleCart}></div>
        )}
        <nav>
          <ul>
            <li>
              <Link
                to="/"
                className={activeLink === "women" ? "selected" : "unselected"}
                onClick={() => this.handleLinkClick("women")}
              >
                Women
              </Link>
            </li>
            <li>
              <Link
                to="/men"
                className={activeLink === "men" ? "selected" : "unselected"}
                onClick={() => this.handleLinkClick("men")}
              >
                Men
              </Link>
            </li>
            <li>
              <Link
                to="/kids"
                className={activeLink === "kids" ? "selected" : "unselected"}
                onClick={() => this.handleLinkClick("kids")}
              >
                Kids
              </Link>
            </li>
          </ul>
        </nav>

        <img className="logo-icon" src={logo} alt="Brand Logo" />
        <div className="cart-icon-container">
          <div className="buble">
            <sub>{cart.length}</sub>
          </div>
          <img
            onClick={this.toggleCart}
            data-testid="cart-btn"
            src={addcart}
            alt="Cart Icon"
          />
        </div>
        {isCartOpen && (
          <div className="cart-container">
            <p>
              <b>My Bag</b> , {cart.length} items
            </p>
            {cart.map((item, index) => (
              <div key={index} className="item-in-cart">
                <div className="d-flex">
                  <div className="dummy">
                    <p>{item.name}</p>
                    <h6>${item.price}</h6>
                    <p>Size:</p>
                    <div className="all-size-btn">
                      {item?.sizes?.map((size) => (
                        <button>{size}</button>
                      ))}
                    </div>
                    <p>Color:</p>
                    <div className="all-color-btn">
                      {item?.colors?.map((clr) => (
                        <button
                          onClick={this.toggleColorSelect}
                          className={this.state.isCartOpen ? "selected" : ""}
                          style={{ backgroundColor: clr }}
                        ></button>
                      ))}
                    </div>
                  </div>
                  <div className="number-of-item">
                    <button onClick={() => addToCart(item)}>+</button>
                    <p>{item.count}</p>
                    <button onClick={() => removeFromCart(item)}>-</button>
                  </div>
                </div>
                <img className="preview-img" src={itemimage} alt="Product" />
              </div>
            ))}
            <div className="totalamount">
              <h3>Total</h3>
              <h3>${this.calculateTotalPrice()}</h3>
            </div>
            <button className="order-btn">PLACE ORDER</button>
          </div>
        )}
      </header>
    );
  }
}

export default Navbar;
