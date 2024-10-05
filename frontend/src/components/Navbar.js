import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const Navbar = ({ isHome, isProdPres, updateBadge, name, setQuery }) => {
  const [totalItems, setTotalItems] = useState(0);
  const [searchText, setSearchText] = useState("");

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchText(query);
    setQuery(query);
  };

  const fetchTotalItems = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5500/api/products/cart/quantity"
      );
      setTotalItems(response.data.totalCount);
    } catch (error) {
      console.error("Error fetching total cart items:", error);
    }
  };

  useEffect(() => {
    fetchTotalItems();
    updateBadge = !updateBadge;
  }, [updateBadge === true]);

  return (
    <>
      <div className="navbar  drop-shadow-md   flex justify-between bg-base-100">
        <div className="flex">
          <div className="drawer mx-6">
            <input id="my-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
              <Link to="/" className=" mt-2">
                <img
                  alt="logo"
                  className="btn-circle "
                  src="data:image/png;base64,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"
                />
              </Link>
            </div>
          </div>
          <div className=" font-black cursor-text mx-6 text-nowrap text-4xl ">
            {name}
          </div>
          <div className="text-4xl font-bold"></div>
        </div>
        <div className="flex-none mx-6">
          {isHome && isProdPres && (
            <div className="form-control mx-12">
              <input
                type="text"
                placeholder="Search"
                value={searchText}
                onChange={handleSearch}
                className="input input-bordered w-30   md:w-96"
              />
            </div>
          )}
          <input
            type="checkbox"
            value="cyberpunk"
            className="toggle theme-controller mx-6"
          />
          <div className="dropdown dropdown-end">
            <Link to="/cart">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle "
              >
                <div className="indicator">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  <span className="badge badge-sm indicator-item">
                    {totalItems}
                  </span>
                </div>
              </div>
            </Link>
          </div>
          <div className="dropdown dropdown-end ">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle mx-6  avatar"
            >
              <div className="w-7 rounded-full">
                <img
                  className=""
                  alt="Tailwind CSS Navbar component"
                  src="https://www.svgrepo.com/show/522451/settings-cog.svg"
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-lg dropdown-content   drop-shadow-xl mt-2 rounded-lg    w-52  "
            >
              <li className="border-gray-400 border-y-2 ">
                <Link to="/addproduct" className="text-md py-2   font-medium">
                  Add Product
                </Link>
              </li>
              <li className="border-gray-400 border-b-2">
                <Link to="/delproduct" className="text-md  py-2  font-medium">
                  Update Product
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
