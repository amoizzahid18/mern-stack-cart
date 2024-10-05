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
  const [isDisabled, setIsDisabled] = useState(false);

  const addItemToCart = async () => {
    try {
      
      const res = await axios.post("http://localhost:5500/api/products/cart", {
        product: id,
        quantity: 1,
      });

      setUpBadge(true);
      alert("Item Added to Cart Successfully!");
    } catch (error) {
      if (error.status === 422) {
        alert("Not Enough Quantity in the Stock!");
      } else {
        console.log(error);
        alert("Error adding item to cart");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (countInStock === 0) {
      setIsDisabled(true);
    }
  }, [isDisabled]);
  return (
    <div className="z-[1]">
      <div className="card card-compact rounded-lg z-[1] bg-base-100 w-96 shadow-xl">
        <div to={`/product/${id}`}>
          <figure className="rounded-lg max-h-96">
            <img className="h-fit  " alt={name} src={imageURL} />
          </figure>
        </div>
        <div className="card-body">
          <h2 className="card-title">
            <Link
              to={`/product/${id}`}
              className="text-balance hover:underline hover: underline-offset-4"
            >
              {name}
            </Link>
            <div className="badge badge-secondary  ">{countInStock}</div>
            <Link
              to={`/product/${id}`}
              className="btn btn-ghost  text-md  btn-sm rounded-full dark:bg-indigo-400 dark:text-black bg-gray-200"
            >
              View
            </Link>
          </h2>

          <p>{description}</p>
          <div className="card-actions items-center justify-end">
            <div className="badge badge-lg bg-gray-50">${price}</div>
            <button
              disabled={isDisabled}
              className={
                isDisabled
                  ? `text-md rounded-lg  p-4 bg-gray-200`
                  : `btn btn-primary`
              }
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
                <span>{isDisabled ? "Out Of Stock" : "Add To Cart"}</span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
