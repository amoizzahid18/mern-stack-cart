import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { set } from "mongoose";

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
  const [isDisabled, setIsDisabled] = useState(false);
  useEffect(() => {
    if (countInStock === 0){
      setIsDisabled(true);
  }}, [isDisabled])
  const addItemToCart = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5500/api/products/cart",
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
        <div to={`/product/${id}`}>
          <figure className="rounded-lg max-h-96">
            <img className="h-fit " src={imageURL} />
          </figure>
        </div>
        <div className="card-body">
          <h2 className="card-title">
            <Link to={`/product/${id}`} className="hover:border-b-2 hover: border-gray-400">{name}</Link>
            <div className="badge badge-secondary  ">{countInStock}</div> 
            <Link to={`/product/${id}`} className="btn btn-ghost  text-md  btn-sm rounded-full dark:bg-indigo-400 dark:text-black bg-gray-200">
              View
            </Link >
          </h2>

          <p>{description}</p>
          <div className="card-actions items-center justify-end">
            <div className="badge badge-lg bg-gray-50">${price}</div>
            <button
              disabled={isDisabled}
              className={isDisabled ? `text-md rounded-lg  p-4 bg-gray-200`:`btn btn-primary`}
              onClick={() => {
                addItemToCart();
                setLoading(true);
              }}
            >
              {loading ? (
                <>
                  <span className="loading loading-dots loading-md "></span>
                </>
              ) : (
                <span>{isDisabled ? "Out Of Stock" : "Add To Stock"}</span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
