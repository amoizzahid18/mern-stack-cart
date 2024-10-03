import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

const Product = ({
  id,
  name,
  description,
  price,
  countInStock,
  imageURL,
  setUpBadge,
}) => {
  const [loading, setLoading] = useState(false);
  const addItemToCart = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/products/cart",
        {
          product: id,
          quantity: 1,
        }
      );
      alert("Item Added to Cart Successfully!");
      setUpBadge(true);
    } catch (error) {
      console.log(error);
      alert("Error adding item to cart");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="z-[1]">
      <div className="card card-compact rounded-lg z-[1] bg-base-100 w-96 shadow-xl">
        <Link to={`/product/${id}`}>
          <figure className="rounded-lg max-h-96">
            <img className="h-fit " src={imageURL} />
          </figure>
        </Link>
        <div className="card-body">
          <h2 className="card-title">
            <Link to={`/product/${id}`} className="hover:border-b-2 hover: border-gray-400">{name}</Link>
            <div className="badge badge-secondary">{countInStock}</div>
            <Link to={`/product/${id}`} className="btn btn-ghost  text-md  btn-sm rounded-full  bg-gray-200">
              View
            </Link >
          </h2>

          <p>{description}</p>
          <div className="card-actions justify-end">
            <div className="badge badge-lg">${price}</div>
            <button
              className="btn btn-primary"
              onClick={() => {
                addItemToCart();
                setLoading(true);
              }}
            >
              {loading ? (
                <>
                  <span className="loading loading-dots loading-md"></span>
                </>
              ) : (
                <span>Add To Cart</span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
