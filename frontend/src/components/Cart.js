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
  const [butLoad, setButLoad] = useState(false);
  const [price, setPrice] = useState(0);
  

  const getItems = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "http://localhost:5500/api/products/cart",
        { timeout: 10000 }
      );
      const data = await response.data;

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      if (data == null || data.length === 0) {
        setLoading(false);
        setIsCartEmpty(true);
      } else {
        setItems(data);
        setLoading(false);
      }
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };

  const deleteCart = async () => {
    try {
      setButLoad(true);
      setLoading(true);
      const res = await axios.delete("http://localhost:5500/api/products/cart");
      if (res) {
        alert("Checkout Successful!");
        setButLoad(false);
        setLoading(false);
        getItems();
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const handleUpdateCart = (flag) => {
    setUpdCart(flag); // Update the state based on the value received from CartItem
  };
  // useEffect(() => {}, [loading]);
  useEffect(() => {
    getItems(); // Fetch items again when updCart is set to true
  }, [updCart === true]);

  useEffect(() => {
    setPrice(items.reduce((s, i) => s + i.product.price * i.quantity, 0));
  }, [items, updCart]);

  return (
    <div>
      <Navbar isHome={false} updateBadge={updCart} name={"Cart"} />
      <div className="flex justify-center items-center my-32 ">
        {!loading && isCartEmpty ? (
          <>
            <div className="text-4xl my-20 font-black ">
              Your Cart is Empty!{" "}
              <u className="text-pink-400 cursor-pointer">
                <Link to="/">Add Some</Link>
              </u>
            </div>
          </>
        ) : loading && !isCartEmpty ? (
          <div>
            <span className="loading loading-ball loading-lg"></span>
            <span className="loading loading-ball loading-lg"></span>
            <span className="loading loading-ball loading-lg"></span>
            <span className="loading loading-ball loading-lg"></span>
          </div>
        ) : (
          !loading &&
          !isCartEmpty && (
            <div className="flex justify-center items-center  w-full  flex-col ">
              <div className=" rounded-md  w-1/2">
                <table className="table  shadow-xl">
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
                      return item.product ? (
                        <CartItem
                          key={item._id}
                          _id={item._id}
                          id={item?.product._id}
                          name={item?.product.name}
                          description={item?.product.description}
                          imageURL={item?.product.imageURL}
                          quantity={item?.quantity}
                          price={item?.product.price}
                          edit_del={false}
                          setUpdCart={handleUpdateCart}
                        />
                      ) : (
                        <></>
                      );
                    })}
                  </tbody>
                </table>
                <div className="font-medium  my-20 ">
                  <div className="flex justify-end">
                    <button className="cursor-text text-lg py-2 px-6 shadow-md mx-6 btn  rounded-lg bg-gray-100">
                      Total Amount:{"  " + price}
                    </button>
                    <button
                      className=" text-lg py-2 px-6 mx-6 shadow-md rounded-lg btn btn-ghost hover:bg-pink-300 text-white bg-secondary"
                      onClick={deleteCart}
                    >
                      {!butLoad ? (
                        "Proceed To Checkout"
                      ) : (
                        <span className="loading loading-dots loading-md"></span>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Cart;
