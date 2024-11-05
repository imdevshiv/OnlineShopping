import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar/navbar"; // Assuming you have a Navbar component
import "./home.css"; // Your CSS for Home
import "./Navbar/navbar.css"; // Your CSS for Navbar
import { useCart } from "../../contexts/CartContext"; // Assuming you have a CartContext

const Home = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { addToCart } = useCart(); // Access addToCart from context

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const products = await response.json();
        setData(products);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (product) => {
    addToCart(product); // Add product to cart
    console.log("Added to cart:", product);
  };

  const handleBuyNow = (product) => {
    // Navigate to checkout page with selected product
    navigate("/checkout", { state: { product } });
  };

  return (
    <div>
      {loading ? (
        <p>Loading products...</p>
      ) : (
        <div className="product-container">
          {data.map((product) => (
            <div key={product.id} className="product-card">
              <img
                src={product.image}
                alt={product.title}
                className="product-image"
              />
              <h3 className="product-title">{product.title}</h3>
              <p className="product-price">${product.price}</p>
              <p className="product-description">
                {product.description.substring(0, 100)}...
              </p>
              <div className="button-group">
                <button
                  onClick={() => handleAddToCart(product)}
                  className="add-to-cart"
                >
                  Add to Cart
                </button>
                <button
                  onClick={() => handleBuyNow(product)}
                  className="buy-now"
                >
                  Buy Now
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
