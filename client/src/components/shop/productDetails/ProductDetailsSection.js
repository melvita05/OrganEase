import React, { Fragment, useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { ProductDetailsContext } from "./index";
import { LayoutContext } from "../layout";
import Submenu from "./Submenu";
import ProductDetailsSectionTwo from "./ProductDetailsSectionTwo";

import { getSingleProduct } from "./FetchApi";
import { cartListProduct } from "../partials/FetchApi";

import { isWishReq, unWishReq, isWish } from "../home/Mixins";
import { updateQuantity, slideImage, addToCart, cartList } from "./Mixins";
import { totalCost } from "../partials/Mixins";

const apiURL = process.env.REACT_APP_API_URL;

const ProductDetailsSection = () => {
  let { id } = useParams();

  const { data, dispatch } = useContext(ProductDetailsContext);
  const { data: layoutData, dispatch: layoutDispatch } =
    useContext(LayoutContext);

  const sProduct = layoutData.singleProductDetail;
  const [pImages, setPimages] = useState(null);
  const [count, setCount] = useState(0);
  const [quantitiy, setQuantitiy] = useState(1);
  const [, setAlertq] = useState(false);

  const [wList, setWlist] = useState(
    JSON.parse(localStorage.getItem("wishList"))
  );

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchData = async () => {
    dispatch({ type: "loading", payload: true });
    try {
      let responseData = await getSingleProduct(id);
      setTimeout(() => {
        if (responseData.Product) {
          layoutDispatch({
            type: "singleProductDetail",
            payload: responseData.Product,
          });
          setPimages(responseData.Product.pImages);
          dispatch({ type: "loading", payload: false });
          layoutDispatch({ type: "inCart", payload: cartList() });
        }
        if (responseData.error) {
          console.log(responseData.error);
        }
      }, 500);
    } catch (error) {
      console.log(error);
    }
    fetchCartProduct();
  };

  const fetchCartProduct = async () => {
    try {
      let responseData = await cartListProduct();
      if (responseData && responseData.Products) {
        layoutDispatch({ type: "cartProduct", payload: responseData.Products });
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (data.loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <svg
          className="w-12 h-12 animate-spin text-green-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          ></path>
        </svg>
      </div>
    );
  } else if (!sProduct) {
    return (
      <div className="text-center text-2xl font-semibold text-gray-600 py-20">
        No Organs Available
      </div>
    );
  }

  return (
    <Fragment>
     <Submenu
  value={{
    categoryId: sProduct.pCategory._id,
    product: `${sProduct.pName} Hours`,
    category: sProduct.pCategory.cName,
  }}
/>

      <section className="px-4 md:px-10 lg:px-16 py-8 bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto bg-white rounded-3xl shadow-xl p-6 md:p-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* Thumbnail Images */}
            <div className="hidden md:flex md:col-span-1 flex-col space-y-4">
              {sProduct.pImages?.map((img, index) => (
                <img
                  key={index}
                  onClick={() =>
                    slideImage("increase", index, count, setCount, pImages)
                  }
                  className={`w-20 h-20 rounded-xl border-2 object-cover cursor-pointer transition duration-200 ${
                    count === index
                      ? "border-green-600 shadow-md"
                      : "border-gray-200 opacity-60 hover:opacity-100"
                  }`}
                  src={`${apiURL}/uploads/products/${img}`}
                  alt="thumbnail"
                />
              ))}
            </div>

            {/* Main Image */}
            <div className="col-span-1 md:col-span-7">
              <div className="relative bg-gray-100 rounded-3xl overflow-hidden shadow-md">
                <img
                  className="w-full h-[320px] md:h-[500px] object-cover"
                  src={`${apiURL}/uploads/products/${sProduct.pImages[count]}`}
                  alt="Organ"
                />

                <button
                  onClick={() =>
                    slideImage("increase", null, count, setCount, pImages)
                  }
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white shadow-md rounded-full p-2 hover:bg-green-50"
                >
                  ❮
                </button>

                <button
                  onClick={() =>
                    slideImage("increase", null, count, setCount, pImages)
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white shadow-md rounded-full p-2 hover:bg-green-50"
                >
                  ❯
                </button>
              </div>
            </div>

            {/* Details Section */}
            <div className="col-span-1 md:col-span-4">
              <div className="bg-gray-50 rounded-3xl p-6 shadow-md border border-gray-100">
                <h2 className="text-3xl font-bold text-gray-800 leading-snug">
                  {sProduct.pDescription}
                </h2>

                <div className="mt-4">
                  <span className="text-base font-semibold text-gray-700">
                    Organ Status:
                  </span>
                  <span
                    className={`ml-3 inline-block px-4 py-1 rounded-full text-sm font-semibold ${
                      sProduct.pStatus === "Active"
                        ? "bg-green-100 text-green-700"
                        : sProduct.pStatus === "Inactive"
                        ? "bg-red-100 text-red-600"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {sProduct.pStatus}
                  </span>
                </div>

                <div className="mt-6 text-gray-600 leading-7 text-sm md:text-base">
                  This organ is available for request based on current Procurement center
                  records and Organ status.
                </div>

                {/* Quantity Box */}
                <div className="mt-8">
                  {+quantitiy === +sProduct.pQuantity && (
                    <span className="text-sm text-red-500 font-medium">
                      Limited Organs Available
                    </span>
                  )}

                  <div
                    className={`mt-3 flex justify-between items-center px-5 py-4 rounded-2xl border bg-white shadow-sm ${
                      +quantitiy === +sProduct.pQuantity
                        ? "border-red-400"
                        : "border-gray-200"
                    }`}
                  >
                    <div
                      className={`font-semibold ${
                        quantitiy === sProduct.pQuantity
                          ? "text-red-500"
                          : "text-gray-700"
                      }`}
                    >
                      Quantity
                    </div>

                    {sProduct.pQuantity !== 0 ? (
                      <Fragment>
                        {layoutData.inCart == null ||
                        (layoutData.inCart !== null &&
                          layoutData.inCart.includes(sProduct._id) === false) ? (
                          <div className="flex items-center space-x-4">
                            <button
                              onClick={() =>
                                updateQuantity(
                                  "decrease",
                                  sProduct.pQuantity,
                                  quantitiy,
                                  setQuantitiy,
                                  setAlertq
                                )
                              }
                              className="w-9 h-9 rounded-full bg-gray-100 hover:bg-green-100 text-lg font-bold"
                            >
                              −
                            </button>

                            <span className="font-bold text-lg text-gray-800">
                              {quantitiy}
                            </span>

                            <button
                              onClick={() =>
                                updateQuantity(
                                  "increase",
                                  sProduct.pQuantity,
                                  quantitiy,
                                  setQuantitiy,
                                  setAlertq
                                )
                              }
                              className="w-9 h-9 rounded-full bg-gray-100 hover:bg-green-100 text-lg font-bold"
                            >
                              +
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center space-x-4 opacity-50 cursor-not-allowed">
                            <button className="w-9 h-9 rounded-full bg-gray-100 text-lg font-bold">
                              −
                            </button>
                            <span className="font-bold text-lg text-gray-800">
                              {quantitiy}
                            </span>
                            <button className="w-9 h-9 rounded-full bg-gray-100 text-lg font-bold">
                              +
                            </button>
                          </div>
                        )}
                      </Fragment>
                    ) : (
                      <div className="flex items-center space-x-4 opacity-50 cursor-not-allowed">
                        <button className="w-9 h-9 rounded-full bg-gray-100 text-lg font-bold">
                          −
                        </button>
                        <span className="font-bold text-lg text-gray-800">
                          {quantitiy}
                        </span>
                        <button className="w-9 h-9 rounded-full bg-gray-100 text-lg font-bold">
                          +
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Request Button */}
                <div className="mt-8">
                  {sProduct.pQuantity !== 0 ? (
                    <Fragment>
                      {layoutData.inCart !== null &&
                      layoutData.inCart.includes(sProduct._id) === true ? (
                        <div className="w-full py-4 rounded-2xl bg-gray-400 text-white text-center uppercase font-semibold shadow-md cursor-not-allowed">
                          Requested
                        </div>
                      ) : (
                        <button
                          onClick={() =>
                            addToCart(
                              sProduct._id,
                              quantitiy,
                              sProduct.pPrice,
                              layoutDispatch,
                              setQuantitiy,
                              setAlertq,
                              fetchData,
                              totalCost
                            )
                          }
                          className="w-full py-4 rounded-2xl bg-green-600 hover:bg-green-700 text-white uppercase font-semibold shadow-lg transition duration-200"
                        >
                          Request Organ
                        </button>
                      )}
                    </Fragment>
                  ) : (
                    <Fragment>
                      {layoutData.inCart !== null &&
                      layoutData.inCart.includes(sProduct._id) === true ? (
                        <div className="w-full py-4 rounded-2xl bg-gray-400 text-white text-center uppercase font-semibold shadow-md cursor-not-allowed">
                          In Organ List
                        </div>
                      ) : (
                        <div className="w-full py-4 rounded-2xl bg-blue-500 text-white text-center uppercase font-semibold shadow-md">
                          Currently Available
                        </div>
                      )}
                    </Fragment>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ProductDetailsSectionTwo />
    </Fragment>
  );
};

export default ProductDetailsSection;