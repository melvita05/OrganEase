import React, { Fragment, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import Layout from "../layout";
import { productByCategory } from "../../admin/products/FetchApi";

const apiURL = process.env.REACT_APP_API_URL;

const Submenu = ({ category }) => {
  const history = useHistory();

  return (
    <Fragment>
      {/* Submenu Section */}
      <section className="mx-4 mt-24 md:mx-12 md:mt-32 lg:mt-24">
        <div className="flex justify-between items-center border-b border-slate-200 pb-3">
          <div className="text-sm flex space-x-3 items-center">
            <span
              className="text-slate-500 hover:text-emerald-700 transition cursor-pointer font-medium"
              onClick={() => history.push("/")}
            >
              Organs
            </span>
            <span className="text-slate-400">/</span>
            <span className="text-emerald-700 font-semibold cursor-default">
              {category}
            </span>
          </div>

          <div className="text-slate-400">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 5l7 7-7 7M5 5l7 7-7 7"
              />
            </svg>
          </div>
        </div>
      </section>
      {/* End Submenu */}
    </Fragment>
  );
};

const AllProduct = ({ products }) => {
  const history = useHistory();
  const category =
    products && products.length > 0 ? products[0].pCategory.cName : "";

  return (
    <Fragment>
      <Submenu category={category} />

      <section className="m-4 md:mx-8 md:my-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {products && products.length > 0 ? (
          products.map((item, index) => {
            return (
              <Fragment key={index}>
                <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden border border-slate-100">
                  <img
                    onClick={() => history.push(`/products/${item._id}`)}
                    className="w-full h-52 object-cover object-center cursor-pointer"
                    src={`${apiURL}/uploads/products/${item.pImages[0]}`}
                    alt={item.pDescription}
                  />

                  <div className="p-4">
                    <div
                      className="text-slate-800 font-semibold text-base line-clamp-2 cursor-pointer hover:text-emerald-700 transition"
                      onClick={() => history.push(`/products/${item._id}`)}
                    >
                      {item.pDescription}
                    </div>

                    <div className="mt-3 text-sm">
                      <span className="text-slate-500 font-medium">
                        Organ Status:{" "}
                      </span>
                      <span
                        className={`font-semibold ${
                          item.pStatus?.toLowerCase() === "available"
                            ? "text-emerald-700"
                            : "text-red-600"
                        }`}
                      >
                        {item.pStatus}
                      </span>
                    </div>
                  </div>
                </div>
              </Fragment>
            );
          })
        ) : (
          <div className="col-span-2 md:col-span-3 lg:col-span-4 flex items-center justify-center py-24 text-2xl text-slate-500 font-medium">
            No Organ found
          </div>
        )}
      </section>
    </Fragment>
  );
};

const PageComponent = () => {
  const [products, setProducts] = useState(null);
  const { catId } = useParams();

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchData = async () => {
    try {
      let responseData = await productByCategory(catId);
      if (responseData && responseData.Products) {
        setProducts(responseData.Products);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Fragment>
      <AllProduct products={products} />
    </Fragment>
  );
};

const ProductByCategory = () => {
  return (
    <Fragment>
      <Layout children={<PageComponent />} />
    </Fragment>
  );
};

export default ProductByCategory;