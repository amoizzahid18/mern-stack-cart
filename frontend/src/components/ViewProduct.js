import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { Link, useParams } from "react-router-dom";
function ViewProduct() {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchData = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/products/product/${id}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setProducts(data);
      setLoading(false);
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <Navbar isHome={false} name={"Product"} />
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
                  <span className="font-bold">Price :</span>{" "}
                    ${products.price}
                  </div>
                  <div>
                    <Link to="/cart">
                      <button className="btn btn-primary py-2 px-6 text-xl">Add To Cart</button>
                    </Link>
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
