import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const CartItem = ({
  _id,
  id,
  name,
  description,
  imageURL,
  quantity,
  price,
  edit_del,
  setProduct,
  setUpdCart,
  setShowModel,
  setUpProd,
  setGetRemovedCartItem,
}) => {
  const [loading, setLoading] = useState(false);
  const [quantityLoad, setQuantityLoad] = useState(false);

  const removeCartItem = async () => {
    try {
      setLoading(true);
      await axios.delete(`http://localhost:5500/api/products/cart/item/${_id}`);
      setUpdCart(true);
      alert("Item removed successfully");
      setLoading(false);
    } catch (error) {
      console.log("Error in removing product from cart", error);
      setLoading(false);
    }
  };

  const minCartItem = async () => {
    try {
      setQuantityLoad(true);
      await axios.delete(
        `http://localhost:5500/api/products/cart/quantity/${_id}`
      );
      setUpdCart(true);
      alert("Quantity decreased successfully");
      setQuantityLoad(false);
    } catch (error) {
      console.log("Error in decreasing quantity in cart", error);
      setQuantityLoad(false);
    }
  };

  const plusCartItem = async () => {
    try {
      setQuantityLoad(true);
      const res = await axios.post("http://localhost:5500/api/products/cart", {
        product: id,
        quantity: 1,
      });

      setUpdCart(true);
      alert("Item Added to Cart Successfully!");
    } catch (error) {
      if (error.status === 422) {
        alert("Not Enough Quantity in the Stock!");
      } else {
        console.log(error);
        alert("Error adding item to cart");
      }
    } finally {
      setQuantityLoad(false);
    }
  };

  const deleteProduct = async () => {
    try {
      setLoading(true);
      await axios.delete(`http://localhost:5000/api/products/delproduct/${id}`);
      alert("Product deleted successfully");
      setLoading(false);
      setUpProd(true);
      setUpdCart(true);
    } catch (error) {
      console.log("Error in deleting product", error);
      setLoading(false);
    }
  };

  useEffect(() => {}, [loading]);
  return (
    <>
      <tr id={id} className="">
        <td>
          <div className="flex items-center ">
            <div className="avatar">
              <div className="mask mask-squircle h-20 w-20 ">
                <img src={imageURL} alt={name} />
              </div>
            </div>
            <div>
              <div className="font-bold mx-4 text-center text-lg">
                <Link
                  to={`/product/${id}`}
                  className="hover:underline hover:underline-offset-2"
                >
                  {name}
                </Link>
              </div>
              <Link to={`/product/${id}`}>
                <button className="btn btn-ghost mx-6  btn-xs my-2 bg-gray-200">
                  View
                </button>
              </Link>
            </div>
          </div>
        </td>
        <td className="">{description}</td>
        <td className="text-lg">
          {!edit_del ? (
            <div className="  w-28  flex justify-center items-center p-0 text-lg shadow-md  text-nowrap text-center rounded-lg bg-gray-100">
              {quantityLoad ? (
                <>
                  <span className="loading loading-dots loading-md my-3"></span>
                </>
              ) : (
                <>
                  <button
                    onClick={minCartItem}
                    className="btn btn-ghost py-2 px-3 text-xl text-center  "
                  >
                    -
                  </button>
                  <div className="cursor-text p-3">{quantity}</div>
                  <button
                    onClick={plusCartItem}
                    className="btn btn-ghost py-2 px-3 text-xl text-center "
                  >
                    +
                  </button>
                </>
              )}
            </div>
          ) : (
            <>{quantity}</>
          )}
        </td>
        <td className="text-lg">${price}</td>
        {edit_del && (
          <>
            <td className="flex flex-row">
              <button
                className="btn btn-ghost  bg-purple-300 px-2 mx-1 py-1"
                onClick={() => {
                  setShowModel(true);
                  setProduct({
                    id: id,
                    name: name,
                    description: description,
                    price: price,
                    countInStock: quantity,
                    imageURL: imageURL,
                  });
                }}
              >
                Edit
              </button>
              <button
                className="btn btn-ghost  bg-red-300 px-2 mx-1 py-1"
                onClick={deleteProduct}
              >
                {!loading ? (
                  "Del"
                ) : (
                  <span className="loading loading-dots loading-md"></span>
                )}
              </button>
            </td>
          </>
        )}
        {!edit_del && (
          <>
            <td className="flex justify-items-center my-4">
              <button
                className="btn btn-ghost  bg-red-300 px-2 mx-1 py-1 "
                onClick={removeCartItem}
              >
                {!loading ? (
                  "Remove"
                ) : (
                  <span className="loading loading-dots loading-md"></span>
                )}
              </button>
            </td>
          </>
        )}
      </tr>
    </>
  );
};

export default CartItem;
