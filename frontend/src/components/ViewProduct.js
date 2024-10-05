import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { useParams } from "react-router-dom";
import axios from "axios";
function ViewProduct() {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDisabled, setIsDisabled] = useState(false);
  const [updateBadge, setUpdateBadge] = useState(false);
  const [butLoad, setButLoad] = useState(false);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5500/api/products/product/${id}`
      );

      const data = response.data;
      if (data.countInStock === 0) {
        setIsDisabled(true);
      }
      setProducts(data);
      setLoading(false);
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };

  // const addItemToCart = async () => {
  //   try {
  //     await axios.post(
  //       "http://localhost:5500/api/products/cart",
  //       {
  //         product: id,
  //         quantity: 1,
  //       }
  //     );
  //     setUpdateBadge(true);
  //     alert("Item Added to Cart Successfully!");
  //   } catch (error) {
  //     console.log(error);
  //     alert("Error adding item to cart");
  //   } finally {
  //     setLoading(false);
  //   }

  // };
  const addItemToCart = async () => {
    try {
      const res = await axios.post("http://localhost:5500/api/products/cart", {
        product: id,
        quantity: 1,
      });

      setUpdateBadge(true);
      alert("Item Added to Cart Successfully!");
    } catch (error) {
      if (error.status === 422) {
        alert("Not Enough Quantity in the Stock!");
      } else {
        console.log(error);
        alert("Error adding item to cart");
      }
    } finally {
      setButLoad(false);
    }
  };
  //eslint-disable-next-line
  useEffect(() => {
    fetchData();
  }, [isDisabled, updateBadge]);

  return (
    <>
      <Navbar
        isHome={false}
        name={"Product Details"}
        updateBadge={updateBadge}
      />
      <div className="flex justify-center items-center my-32">
        {loading ? (
          <>
            <span className="loading loading-ball loading-lg"></span>
            <span className="loading loading-ball loading-lg"></span>
            <span className="loading loading-ball loading-lg"></span>
            <span className="loading loading-ball loading-lg"></span>
          </>
        ) : (
          <>
            <div className="hero max-w-screen-xl ">
              <div className="hero-content flex-col lg:flex-row">
                <img
                  alt={products.name}
                  src={products.imageURL}
                  className="max-w-sm mx-10 rounded-lg drop-shadow-2xl shadow-2xl "
                />
                <div>
                  <h1 className="text-5xl font-bold">{products.name}</h1>
                  <p className="py-4     text-xl">{products.description}</p>
                  <div className="py-4 text-xl font-medium">
                    <span className="font-bold">Quantity :</span>{" "}
                    {products.countInStock}
                  </div>
                  <div className="font-medium my-4 text-xl">
                    <span className="font-bold">Price :</span> ${products.price}
                  </div>
                  <div>
                    <div>
                      <button
                        disabled={isDisabled}
                        className="btn btn-primary py-2 px-6 text-xl"
                        onClick={() => {
                          addItemToCart();
                          setButLoad(true);
                        }}
                      >
                        {butLoad ? (
                          <>
                            <span className="loading loading-dots loading-md "></span>
                          </>
                        ) : (
                          <span>
                            {isDisabled ? "Out Of Stock" : "Add To Cart"}
                          </span>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default ViewProduct;
