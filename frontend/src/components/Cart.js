import React from "react";
import Navbar from "./Navbar";
import CartItem from "./CartItem";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Cart = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isCartEmpty, setIsCartEmpty] = useState(false);
  const [updCart, setUpdCart] = useState(false);
  const [emptLoad, setEmptLoad] = useState(false);
  const [butLoad, setButLoad] = useState(false);
  const [price, setPrice] = useState(0);

  const getItems = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "http://localhost:5500/api/products/cart"
      );
      const data = await response.data;

      if (data == null || data.length === 0) {
        setLoading(false);
        setIsCartEmpty(true);
      } else {
        setItems(data);
        setLoading(false);
        setUpdCart(false);
      }
    } catch (error) {
      console.error(
        "There was a problem with the getItems fetch operation in cart :",
        error
      );
    }
  };

  const deleteCart = async () => {
    try {
      setEmptLoad(true);
      const res = await axios.delete("http://localhost:5500/api/products/cart");
      if (res) {
        alert("Cart emptied successfully");
        setLoading(false);
        setUpdCart(true);
        getItems();
      }
    } catch (error) {
      console.error(error);
      setEmptLoad(false);
    }
  };

  const checkoutCart = async () => {
    try {
      setButLoad(true);
      const res = await axios.delete(
        "http://localhost:5500/api/products/cart/checkout"
      );
      if (res) {
        alert("Checked out successfully");
        setButLoad(false);
        setUpdCart(true);
        getItems();
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
      setButLoad(false);
    }
  };

  const handleUpdateCart = (flag) => {
    setUpdCart(flag); // Update the state based on the value received from CartItem
  };

  useEffect(() => {
    getItems(); // Fetch items again when updCart is set to true
  }, [updCart]);

  useEffect(() => {
    setPrice(items.reduce((s, i) => s + i.product.price * i.quantity, 0));
  }, [items, updCart]);

  return (
    <div>
      <Navbar isHome={false} updateBadge={updCart} name={"Cart"} />
      <div className="flex justify-center items-center py-16 ">
        {!loading && isCartEmpty ? (
          <>
            <div className="text-4xl  font-black my-32">
              Your Cart is Empty!{" "}
              <u className="text-pink-400 cursor-pointer">
                <Link to="/">Add Some</Link>
              </u>
            </div>
          </>
        ) : loading && !isCartEmpty ? (
          <div className="my-32">
            <span className="loading loading-ball loading-lg"></span>
            <span className="loading loading-ball loading-lg"></span>
            <span className="loading loading-ball loading-lg"></span>
            <span className="loading loading-ball loading-lg"></span>
          </div>
        ) : (
          !loading &&
          !isCartEmpty && (
            <div className=" flex justify-center items-center flex-col w-full">
              <div className=" rounded-md flex justify-items-center  w-3/5">
                <table className="table  text-center shadow-xl">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="text-lg text-gray-700">Name</th>
                      <th className="text-lg text-gray-700">Description</th>
                      <th className="text-lg text-gray-700">Quantity</th>
                      <th className="text-lg text-gray-700">Price</th>
                      <th className="text-lg text-gray-700">Remove</th>
                    </tr>
                  </thead>
                  <tbody className="">
                    {items.map((item) => {
                      return (
                        <CartItem
                          key={item._id}
                          _id={item._id}
                          id={item.product._id}
                          name={item.product.name}
                          description={item.product.description}
                          imageURL={item.product.imageURL}
                          quantity={item.quantity}
                          price={item.product.price}
                          edit_del={false}
                          setUpdCart={handleUpdateCart}
                        />
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <div className="font-medium mt-10 mr-10 min-w-full flex justify-end flex-row items-center">
                <div className="cursor-text text-lg py-3 px-6 shadow-md mx-6  text-nowrap  rounded-lg bg-gray-100">
                  Total Amount:{" $" + price.toFixed(2)}
                </div>
                <button
                  className=" text-lg py-2 px-6 mx-6 shadow-md rounded-lg btn btn-ghost hover:bg-pink-300 text-white bg-secondary"
                  onClick={checkoutCart}
                >
                  {!butLoad ? (
                    "Proceed To Checkout"
                  ) : (
                    <span className="loading loading-dots loading-md"></span>
                  )}
                </button>
                <button
                  className=" text-lg py-2 px-6 mx-6 shadow-md rounded-lg btn btn-ghost hover:bg-blue-300 text-white bg-primary"
                  onClick={deleteCart}
                >
                  {!emptLoad ? (
                    "Empty Cart"
                  ) : (
                    <span className="loading loading-dots loading-md"></span>
                  )}
                </button>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Cart;
