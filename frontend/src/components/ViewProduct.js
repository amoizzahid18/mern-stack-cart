import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
function ViewProduct() {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDisabled, setIsDisabled] = useState(false);
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5500/api/products/product/${id}`
      );
     
      const data = await response.data ;
      if (data.countInStock === 0) {
        setIsDisabled(true);
      }
      setProducts(data);
      setLoading(false);
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {}, [isDisabled]);
  return (
    <>
      <Navbar isHome={false} name={"Product Details"} />
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
                    <div to="/cart">
                      <button
                        disabled={isDisabled}
                        className="btn btn-primary py-2 px-6 text-xl"
                      >
                        {isDisabled ? "Out Of Stock" : <Link to="/cart">"Add To Stock"</Link>}
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
