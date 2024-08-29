import React, { Component } from "react";
import addCartWhite from "../assests/images/addcartwhite.svg";
import product1 from "../assests/images/product1.svg";
import withNavigate from "../withNavigate";

class Men extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isHovered: false,
      hoveredProductId: null,
    };

    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.handleCardClick = this.handleCardClick.bind(this);
    this.handleAddToCartClick = this.handleAddToCartClick.bind(this);
  }

  products = [
    {
      id: 133,
      name: "Running Short",
      price: 50,
      colors: ["red", "green", "yellow"],
      sizes: ["XS", "S", "L", "XL"],
      productImg: product1,
    },
    {
      id: 2332,
      name: "Tennis Skirt",
      price: 40,
      productImg: product1,
      colors: ["red", "green", "yellow"],
      sizes: ["XS", "S", "L", "XL"],
    },
  ];

  handleMouseEnter(productId) {
    this.setState({ isHovered: true, hoveredProductId: productId });
  }

  handleMouseLeave() {
    this.setState({ isHovered: false, hoveredProductId: null });
  }

  handleCardClick(event, product) {
    // Prevent the event from propagating to avoid issues with navigation
    event.stopPropagation();
    this.props.navigate(`/product-details/${product.id}`, {
      state: { product },
    });
  }

  handleAddToCartClick(event, product) {
    event.stopPropagation();
    console.log("Add to cart", product);
    // Add your add-to-cart logic here
  }

  render() {
    const { addToCart } = this.props;
    const { isHovered, hoveredProductId } = this.state;

    return (
      <div>
        <h1 className="heading-page">Men</h1>
        <div className="container">
          {this.products.map((product) => (
            <div
              key={product.id}
              className="card"
              onMouseEnter={() => this.handleMouseEnter(product.id)}
              onMouseLeave={this.handleMouseLeave}
              onClick={(event) => this.handleCardClick(event, product)}
            >
              <div style={{ position: "relative", display: "block" }}>
                <img
                  className="card-img"
                  src={product.productImg}
                  alt={product.name}
                />
                {isHovered && hoveredProductId === product.id && (
                  <img
                    src={addCartWhite}
                    style={{
                      position: "absolute",
                      top: "11rem",
                      right: "1rem",
                      backgroundColor: "#5ECE7B",
                      border: "none",
                      padding: "10px",
                      borderRadius: "30px",
                      cursor: "pointer",
                    }}
                    alt="Add to Cart"
                    onClick={() => addToCart(product)}
                  />
                )}
              </div>
              <div className="card-content">
                <p className="card-description">{product.name}</p>
                <h6 className="card-title">${product.price}</h6>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default withNavigate(Men);
