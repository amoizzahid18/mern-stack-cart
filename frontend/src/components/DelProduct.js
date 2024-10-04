import React from "react";
import Navbar from "./Navbar";
import CartItem from "./CartItem";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
const DelProduct = () => {
  const [products, setProducts] = useState();
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModel] = useState(false);
  const [isProdPres, setIsProdPres] = useState(true);
  const [upProd, setUpProd] = useState(false);
  const [query, setQuery] = useState("");
  const [filteredProds, setFilteredProds] = useState([]);
  const [empty, setEmpty] = useState(false);
  const [error, setError] = useState(false);
  const [product, setProduct] = useState({
    id: "",
    name: "",
    description: "",
    price: "",
    countInStock: "",
    imageURL: "",
  });

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:5500/api/products");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.data;
      if (data == null || data.length === 0) {
        setIsProdPres(false);
        setLoading(false);
      } else {
        setIsProdPres(true);
        setProducts(data);
        setFilteredProds(data);
        setLoading(false);
      }
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };
  const addProd = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      await axios.put(
        `http://localhost:5500/api/products/product/${product.id}`,
        product
      );
      alert("Product edited successfully");
      setProduct({
        id: "",
        name: "",
        description: "",
        price: "",
        countInStock: "",
        imageURL: "",
      });
      setShowModel(false);
      fetchData();
      setLoading(false);
    } catch (error) {
      setLoading(false);
      alert("Error while adding product to db", error);
      console.error(error);
    }
  };

  const handleSearch = () => {
    if (query.trim() == "") {
      setEmpty(false);
      setFilteredProds(products);
    } else {
      const filtered = products.filter((item) =>
        item.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredProds(filtered);
      if (filtered.length === 0) setEmpty(true);
      else setEmpty(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [upProd === true]);
  useEffect(() => {
    handleSearch();
  }, [query]);
  return (
    <div className="">
      <Navbar
        isHome={true}
        isProdPres={isProdPres}
        name={"Update Products"}
        setQuery={setQuery}
      />
      <div className="flex justify-center  items-center my-20 ">
        {!loading && !isProdPres ? (
          <>
            <div className="text-4xl my-20 font-black ">
              No Products Available!{" "}
              <u className="text-pink-400 cursor-pointer">
                <Link to="/addproduct">Add One</Link>
              </u>
            </div>
          </>
        ) : loading && isProdPres ? (
          <>
            <span className="loading loading-ball loading-lg"></span>
            <span className="loading loading-ball loading-lg"></span>
            <span className="loading loading-ball loading-lg"></span>
            <span className="loading loading-ball loading-lg"></span>
          </>
        ) : (
          !loading &&
          isProdPres && (
            <div className="  flex justify-center w-3/5">
              {!showModal &&
                (empty ? (
                  <>
                    <div className="text-4xl my-20 font-black ">
                      No Items Matched
                      <span className="text-pink-400">' {query}'</span>
                    </div>
                  </>
                ) : (
                  <table className="rounded-md table  shadow-xl">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="text-lg text-gray-700">Name</th>
                        <th className="text-lg text-gray-700">Description</th>
                        <th className="text-lg text-gray-700">Quantity</th>
                        <th className="text-lg text-gray-700">Price</th>
                        <th className="text-lg text-gray-700">Edit / Del</th>
                      </tr>
                    </thead>
                    <tbody className="">
                      {filteredProds.map((product) => {
                        return (
                          <CartItem
                            id={product._id}
                            name={product.name}
                            description={product.description}
                            imageURL={product.imageURL}
                            quantity={product.countInStock}
                            price={product.price}
                            edit_del={true}
                            setShowModel={setShowModel}
                            setProduct={setProduct}
                            setUpProd={setUpProd}
                          />
                        );
                      })}
                    </tbody>
                  </table>
                ))}
              {showModal && (
                <div id="my_modal_3" className="z-20 absolute  mx-auto">
                  <div className="modal-box">
                    <div className=" flex flex-wrap  justify-center">
                      <form className="">
                        <button
                          className="btn ml-96 btn-sm btn-circle btn-ghost"
                          onClick={() => setShowModel(false)}
                        >
                          ✕
                        </button>

                        <h3 className=" text-4xl mb-12 ">Edit Product</h3>
                        <div className="flex mx-2 items-center flex-wrap ">
                          <div className="font-bold w-full ml-1">NAME</div>
                          <label
                            className="mt-2 mb-6 bg-gray-100 font-medium input rounded-full w-full flex items-center gap-2"
                            htmlFor=""
                          >
                            <input
                              type="text"
                              className=" w-full text-black"
                              placeholder="Name"
                              name="name"
                              onChange={handleChange}
                              value={product.name}
                            />
                          </label>
                          <br />
                          <div className="flex justify-between flex-row">
                            <div className="font-bold w-full  ml-1 mr-8">
                              PRICE
                              <label
                                className="mt-2 mb-6 bg-gray-100 font-medium input rounded-full w-full flex items-center gap-2"
                                htmlFor=""
                              >
                                <input
                                  type="text"
                                  className="w-full text-black"
                                  placeholder="Price"
                                  name="price"
                                  onChange={handleChange}
                                  value={product.price}
                                />
                              </label>
                            </div>

                            <div className="font-bold w-full ml-1">
                              Quantity
                              <label
                                className="mt-2 mb-6 bg-gray-100 font-medium input rounded-full w-full flex items-center gap-2"
                                htmlFor=""
                              >
                                <input
                                  type="text"
                                  className="w-full  text-black"
                                  placeholder="Quantity"
                                  name="countInStock"
                                  onChange={handleChange}
                                  value={product.countInStock}
                                />
                              </label>
                            </div>
                          </div>
                          <br />

                          <div className="font-bold w-full ml-1">IMAGE URL</div>
                          <label
                            className="mt-2 mb-6 bg-gray-100 input w-full rounded-full flex items-center gap-2"
                            htmlFor=""
                          >
                            <input
                              type="text"
                              className="w-full text-black"
                              placeholder="Image Url"
                              name="imageURL"
                              onChange={handleChange}
                              value={product.imageURL}
                            />
                          </label>
                          <br />
                          <div className="font-bold w-full ml-1">
                            DESCRIPTION
                          </div>
                          <textarea
                            className="textarea bg-gray-100 text-lg w-full mt-2 mb-6 text-black  rounded-3xl "
                            placeholder="Product Description"
                            name="description"
                            onChange={handleChange}
                            value={product.description}
                          ></textarea>

                          <button
                            className="w-full my-4 text-lg btn btn-primary rounded-full  h-12"
                            onClick={addProd}
                          >
                            {loading ? (
                              <>
                                <span className="loading loading-dots loading-md"></span>
                              </>
                            ) : (
                              <>
                                <span>Edit Product</span>
                              </>
                            )}
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default DelProduct;
