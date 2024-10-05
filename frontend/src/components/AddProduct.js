import React from "react";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
const AddProduct = () => {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: 0,
    countInStock: 0,
    imageURL: "",
  });
  const [loading, setLoading] = useState(false);

  // Handle form input changes
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
      await axios.post(
        "http://localhost:5500/api/products/addproduct",
        product
      );
      setLoading(false);
      setProduct({
        name: "",
        description: "",
        price: 0,
        countInStock: 0,
        imageURL: "",
      });
      alert("Product added successfully to db");
    } catch (error) {
      setLoading(false);
      alert("Error while adding product to db");
      console.error(error);
    }
  };

  useEffect(() => {}, [product]);
  return (
    <>
      <Navbar isHome={false} name={"Add Product"} />
      <div className="w-screen my-20  h-auto flex justify-center  items-center">
        <div  className="modal-box">
          <div className=" flex flex-wrap  justify-center">
            <form onSubmit={addProd} className="">
              <Link
                to="/"
                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              >
                ✕
              </Link>

              {/* <h3 className=" text-4xl mb-12 mt-4">Add Product</h3> */}
              <div className="flex mx-2 items-center flex-wrap mt-6">
                <div className="font-bold w-full ml-1">NAME</div>
                <label
                  className="mt-2 mb-6 bg-gray-100 input rounded-full w-full flex items-center gap-2"
                  htmlFor=""
                >
                  <input
                    type="text"
                    className=" w-full text-black"
                    placeholder="Name"
                    required
                    name="name"
                    onChange={handleChange}
                    value={product.name}
                  />
                </label>
                <br />
                <div className="flex justify-between flex-row">
                  <div className="font-bold w-full ml-1 mr-8">
                    PRICE
                    <label
                      className="mt-2 mb-6 bg-gray-100 input rounded-full w-full flex items-center gap-2"
                      htmlFor=""
                    >
                      <input
                        type="text"
                        className="w-full text-black"
                        placeholder="Price"
                        required
                        name="price"
                        onChange={handleChange}
                        value={product.price}
                      />
                    </label>
                  </div>

                  <div className="font-bold w-full ml-1">
                    Quantity
                    <label
                      className="mt-2 mb-6 bg-gray-100 input rounded-full w-full flex items-center gap-2"
                      htmlFor=""
                    >
                      <input
                        type="text"
                        className="w-full  text-black"
                        placeholder="Quantity"
                        required
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
                    required
                    name="imageURL"
                    onChange={handleChange}
                    value={product.imageURL}
                  />
                </label>
                <br />
                <div className="font-bold w-full ml-1">DESCRIPTION</div>
                <textarea
                  className="textarea bg-gray-100 text-lg w-full mt-2 mb-6 text-black  rounded-3xl "
                  placeholder="Product Description"
                  required
                  name="description"
                  onChange={handleChange}
                  value={product.description}
                ></textarea>

                <button
                  className="w-full my-4 text-lg btn btn-primary rounded-full  h-12"
                  type="submit"
                >
                  {loading ? (
                    <>
                      <span className="loading loading-dots loading-md"></span>
                    </>
                  ) : (
                    <>
                      <span>Add Product</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddProduct;
