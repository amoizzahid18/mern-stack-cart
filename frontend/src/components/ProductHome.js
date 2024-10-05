import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import Product from "./Product"; 
import axios from "axios";

const ProductHome = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isProdPres, setIsProdPres] = useState(true);
  const [upBadge, setUpBadge] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [query, setQuery] = useState("");
  const [empty, setEmpty] = useState(false);
  
  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:5500/api/products");
      const data = await response.data;
      if (data == null || data.length === 0) {
        setIsProdPres(false);
        setLoading(false);
      } else {
        setProducts(data);
        setFilteredProducts(data);
        setLoading(false);
        setIsProdPres(true);
      }
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };
  const handleSearch = () => {
    setEmpty(false);
    if (query.trim() === "") {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter((item) =>
        item.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredProducts(filtered);
      if (filtered.length === 0) setEmpty(true);
      else setEmpty(false);
    }
  };

  useEffect(() => {
    fetchData();
    // No need to call handleSearch here
  }, []);

  useEffect(() => {
    handleSearch(); // This will trigger whenever `query` updates
  }, [query]);

  useEffect(() => {
    if(upBadge)
      setUpBadge(!upBadge);
  }, [upBadge]);

  return (
    <>
      <Navbar
        isProdPres={isProdPres}
        isHome={true}
        updateBadge={upBadge}
        name={"Home"}
        setQuery={setQuery}
      />

      <div className="flex items-center  justify-center my-32  ">
        {loading && isProdPres ? (
          <>
            <div className="flex justify-center items-center flex-col ">
              <div>
                <span className="loading loading-ball loading-lg"></span>
                <span className="loading loading-ball loading-lg"></span>
                <span className="loading loading-ball loading-lg"></span>
                <span className="loading loading-ball loading-lg"></span>
              </div>
              <div className="flex justify-center flex-row">
                <div className="flex w-80  flex-col gap-4 m-10  ">
                  <div className="skeleton h-32 w-full"></div>
                  <div className="skeleton h-4 w-28"></div>
                  <div className="skeleton h-4 w-full"></div>
                  <div className="skeleton h-4 w-full"></div>
                </div>
                <div className="flex w-80  flex-col gap-4 m-10">
                  <div className="skeleton h-32 w-full"></div>
                  <div className="skeleton h-4 w-28"></div>
                  <div className="skeleton h-4 w-full"></div>
                  <div className="skeleton h-4 w-full"></div>
                </div>
                <div className="flex w-80  flex-col gap-4 m-10">
                  <div className="skeleton h-32 w-full"></div>
                  <div className="skeleton h-4 w-28"></div>
                  <div className="skeleton h-4 w-full"></div>
                  <div className="skeleton h-4 w-full"></div>
                </div>
                <div className="flex w-80  flex-col gap-4 m-10">
                  <div className="skeleton h-32 w-full"></div>
                  <div className="skeleton h-4 w-28"></div>
                  <div className="skeleton h-4 w-full"></div>
                  <div className="skeleton h-4 w-full"></div>
                </div>
              </div>
            </div>
          </>
        ) : !loading && isProdPres ? (
          empty ? (
            <>
              <div className="text-4xl my-20 font-black ">
                No Items Matched
                <span className="text-pink-400"> '{query}'</span>
              </div>
            </>
          ) : (
            <>
              <div className=" carousel mt-10 z-[0] w-5/6  ">
                {filteredProducts.map((product) => {
                  return (
                    <div className="carousel-item m-4  h-auto">
                      <Product
                        key={product._id}
                        id={product._id}
                        name={product.name}
                        description={product.description}
                        price={product.price}
                        countInStock={product.countInStock}
                        imageURL={product.imageURL}
                        setUpBadge={setUpBadge}
                      />
                    </div>
                  );
                })}
              </div>
            </>
          )
        ) : (
          !loading &&
          !isProdPres && (
            <>
              <div className="text-4xl my-20 font-black ">
                No Products Available!{" "}
                <u className="text-pink-400 cursor-pointer">
                  <Link to="/addproduct">Add One</Link>
                </u>
              </div>
            </>
          )
        )}
      </div>
    </>
  );
};

export default ProductHome;
