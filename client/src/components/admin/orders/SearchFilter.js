//import React, { Fragment } from "react";

import React, { Fragment, useState } from "react";


const SearchFilter = ({ orders, dispatch }) => {
  const [searchTerm, setSearchTerm] = useState("");
 const handleSearch = (e) => {
  const value = e.target.value;
  setSearchTerm(value);

  if (!value) {
    // If input is empty, show all orders
    dispatch({ type: "fetchOrderAndChangeState", payload: orders });
    return;
  }

  // Filter orders based on organId, safely checking if product.id exists
  const filtered = orders.filter((order) =>
    order.allProduct.some(
      (product) =>
        product.id && // <-- check if product.id exists
        product.id.organId &&
        product.id.organId.toLowerCase().includes(value.toLowerCase())
    )
  );

  dispatch({ type: "fetchOrderAndChangeState", payload: filtered });
};


  return (
    <Fragment>
      <div className="rounded-full flex items-center justify-between overflow-hidden">
        <span style={{ background: "#303031" }} className="py-2 px-3">
          <svg
            className="rounded-l-full w-6 h-6 text-gray-100"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            />
          </svg>
        </span>
        <input
          placeholder="Organ Request id..."
          className="py-2 px-2 focus:outline-none rounded-r-full w-full"
          type="text"
            value={searchTerm}
  onChange={handleSearch}
        />
        
      </div>
    </Fragment>
  );
};

export default SearchFilter;
