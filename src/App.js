import React, { Component } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./NavBar";
import "./main.scss";
import Women from "./components/Women";
import Men from "./components/Men";
import Kids from "./components/Kids";
import ProductDetails from "./pages/ProductDetails";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: [],
    };
  }

  addToCart = (item) => {
    this.setState((prevState) => {
      const itemInCart = prevState.cart.find(
        (cartItem) => cartItem.id === item.id
      );
      if (itemInCart) {
        return {
          cart: prevState.cart.map((cartItem) =>
            cartItem.id === item.id
              ? { ...cartItem, count: cartItem.count + 1 }
              : cartItem
          ),
        };
      } else {
        return {
          cart: [...prevState.cart, { ...item, count: 1 }],
        };
      }
    });
  };

  removeFromCart = (item) => {
    this.setState((prevState) => {
      const itemInCart = prevState.cart.find(
        (cartItem) => cartItem.id === item.id
      );
      if (itemInCart.count === 1) {
        return {
          cart: prevState.cart.filter((cartItem) => cartItem.id !== item.id),
        };
      } else {
        return {
          cart: prevState.cart.map((cartItem) =>
            cartItem.id === item.id
              ? { ...cartItem, count: cartItem.count - 1 }
              : cartItem
          ),
        };
      }
    });
  };

  render() {
    return (
      <Router>
        <NavBar
          cart={this.state.cart}
          addToCart={this.addToCart}
          removeFromCart={this.removeFromCart}
        />
        <Routes>
          <Route path="/" element={<Women addToCart={this.addToCart} />} />
          <Route path="/men" element={<Men addToCart={this.addToCart} />} />
          <Route path="/kids" element={<Kids addToCart={this.addToCart} />} />
          <Route
            path="/product-details/:id"
            element={<ProductDetails addToCart={this.addToCart} />}
          />
        </Routes>
      </Router>
    );
  }
}

export default App;
