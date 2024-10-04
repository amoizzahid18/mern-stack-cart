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
  setUpProd
}) => {
  const [loading, setLoading] = useState(false);

  const removeCartItem = async () => {
    try {
      setLoading(true);
      const res = await axios.delete(
        `http://localhost:5000/api/products/cart/${_id}`
      );
      setLoading(false);
      setUpdCart(true);
    } catch (error) {
      console.log("Error in removing from cart", error);
      setLoading(false);
    }
  };
  const deleteProduct = async () => {
    try {
      setLoading(true);
      const res = await axios.delete(
        `http://localhost:5000/api/products/delproduct/${id}`
      );
      alert("Product deleted successfully");
      setLoading(false);
      setUpProd(true);
    } catch (error) {
      console.log("Error in deleting product", error);
      setLoading(false);
    }
  };

  useEffect(() => {}, []);
  return (
    <>
      <tr id={id} className="">
        <td>
          <div className="flex items-center ">
            <div className="avatar">
              <div className="mask mask-squircle h-20 w-20 ">
                <img src={imageURL} />
              </div>
            </div>
            <div>
            <Link to={`/product/${id}`}className="font-bold mx-4 text-lg">{name}</Link>
              <Link to={`/product/${id}`}>
                <button className="btn btn-ghost mx-6  btn-xs my-2 bg-gray-200">
                  View
                </button>
              </Link>
            </div>
          </div>
        </td>
        <td className="">{description}</td>
        <td>{quantity}</td>
        <td>${price}</td>
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
                onClick={() => {
                  deleteProduct();
                  removeCartItem();
                }}
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
