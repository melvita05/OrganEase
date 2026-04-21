import React, { Fragment, createContext, useReducer, useEffect } from "react";
import { Navber, Footer, CartModal } from "../partials";
import Sidebar from "./Sidebar";
//import { layoutReducer, layoutState } from "./layoutContext"; 

import{

  dashboardUserState,
  dashboardUserReducer,
} from "./DashboardUserContext";
import { fetchData,DashboardUser } from "./Action";

export const DashboardUserContext = createContext();

const Layout = ({ children }) => {
  const [data, dispatch] = useReducer(dashboardUserReducer, dashboardUserState);

  useEffect(() => {
    loadNotifications();
    fetchData(dispatch);
  }, []);

 

const loadNotifications = async () => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) return;

    const res = await fetch(
      `${process.env.REACT_APP_API_URL}/api/user/notifications/${user._id}`
    );

    const dataRes = await res.json();

    if (dataRes.notifications) {
      dispatch({
        type: "setNotifications",
        payload: dataRes.notifications,
      });

      dispatch({
        type: "setUnreadCount",
        payload: dataRes.notifications.filter(n => !n.isRead).length,
      });
    }
  } catch (err) {
    console.log(err);
  }
};


  return (
    <Fragment>
      <DashboardUserContext.Provider value={{ data, dispatch }}>
        <div className="flex-grow">
          <Navber />
          <CartModal />
          <div className="mx-4 mt-24 md:mx-12 md:mt-32 lg:mt-24 flex flex-col md:flex-row">
            <Sidebar />
            {/* All Children pass from here */}
            {children}
          </div>
        </div>
        <Footer />
      </DashboardUserContext.Provider>
    </Fragment>
  );
};

export default Layout;
