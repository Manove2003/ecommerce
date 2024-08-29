import React, { Component } from "react";
import Productimg from "../assests/images/product1.svg";
import Productimage from "../assests/images/Brand icon.svg";
// import "./ProductDetail.css";
import "../main.scss";

class ProductDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "Running Short",
      price: 50,
      colors: ["red", "green", "yellow"],
      sizes: ["XS", "S", "L", "XL"],
      images: [Productimage, Productimg, Productimg, Productimg, Productimg], // Array of images
      selectedImageIndex: 0, // To track the selected image
    };
  }

  handleSizeChange = (size) => {
    this.setState({ size });
  };

  handleColorChange = (color) => {
    this.setState({ color });
  };

  handleImageSelect = (index) => {
    this.setState({ selectedImageIndex: index });
  };

  handleNextImage = () => {
    this.setState((prevState) => ({
      selectedImageIndex:
        (prevState.selectedImageIndex + 1) % prevState.images.length,
    }));
  };

  handlePreviousImage = () => {
    this.setState((prevState) => ({
      selectedImageIndex:
        (prevState.selectedImageIndex - 1 + prevState.images.length) %
        prevState.images.length,
    }));
  };

  render() {
    const { size, color, price, colors, sizes, images, selectedImageIndex } =
      this.state;
    const { addToCart } = this.props;

    const product = {
      id: 45,
      name: "Running Short",
      price: 50,
      colors: ["red", "green", "yellow"],
      sizes: ["XS", "S", "L", "XL"],
      Productimg,
    };

    return (
      <div className="containerProduct">
        <div className="image-section">
          <div className="thumbnail-list">
            {images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`product-thumbnail-${index}`}
                onClick={() => this.handleImageSelect(index)}
                className={`thumbnail ${
                  selectedImageIndex === index ? "selected" : ""
                }`}
              />
            ))}
          </div>
          <div className="image-navigation">
            <button onClick={this.handlePreviousImage} className="left">
              {"<"}
            </button>
            <div className="main-image">
              <img src={images[selectedImageIndex]} alt="product" />
            </div>
            <button onClick={this.handleNextImage} className="left">
              {">"}
            </button>
          </div>
        </div>
        <div className="details-section">
          <h2>{this.state.name}</h2>
          <div className="options">
            <div className="sizes">
              <p>SIZE:</p>
              {this.state.sizes.map((s) => (
                <button
                  key={s}
                  className={`size-button ${size === s ? "selected" : ""}`}
                  onClick={() => this.handleSizeChange(s)}
                >
                  {s}
                </button>
              ))}
            </div>
            <div className="colors">
              <p>COLOR:</p>
              {this.state.colors.map((c) => (
                <button
                  key={c}
                  className={`color-button ${color === c ? "selected" : ""}`}
                  onClick={() => this.handleColorChange(c)}
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
          </div>
          <p className="price">PRICE: ${this.state.price.toFixed(2)}</p>
          <button className="add-to-cart" onClick={() => addToCart(product)}>
            ADD TO CART
          </button>
          <p className="description">
            Find stunning women's cocktail dresses and party dresses. Stand out
            in lace and metallic cocktail dresses and party dresses from all
            your favorite brands.
          </p>
        </div>
      </div>
    );
  }
}

export default ProductDetail;
