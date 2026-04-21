import React from "react";
import {
  Home,
  WishList,
  ProtectedRoute,
  AdminProtectedRoute,
  CartProtectedRoute,
  PageNotFound,
  ProductDetails,
  ProductByCategory,
  CheckoutPage,
} from "./shop";
import { DashboardAdmin, Categories, Products, Orders } from "./admin";
import { UserProfile, UserOrders, SettingUser } from "./shop/dashboardUser";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Notifications from "./shop/dashboardUser/notifications";

//import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Signup from "../components/shop/auth/Signup";
import ForgotPassword from "../components/shop/auth/ForgotPassword";
//import ProductCategoryDropdown from "./shop/home/ProductCategoryDropdown";
import ContactUs from "./shop/partials/ContactUs";
export { default as  Notifications } from "./shop/dashboardUser/notifications";


/* Routing All page will be here */
const Routes = (props) => {
  return (
    <Router>
      <Switch>
        {/* Shop & Public Routes */}
        <Route exact path="/" component={Home} />
        <Route exact path="/wish-list" component={WishList} />
        <Route exact path="/products/:id" component={ProductDetails} />
        <Route
          exact
          path="/products/category/:catId"
          component={ProductByCategory}
        />
        <CartProtectedRoute
          exact={true}
          path="/checkout"
          component={CheckoutPage}
        />
        {/* Shop & Public Routes End */}

        {/* Admin Routes */}
        <AdminProtectedRoute
          exact={true}
          path="/admin/dashboard"
          component={DashboardAdmin}
        />
        <AdminProtectedRoute
          exact={true}
          path="/admin/dashboard/categories"
          component={Categories}
        />
        <AdminProtectedRoute
          exact={true}
          path="/admin/dashboard/products"
          component={Products}
        />
        <AdminProtectedRoute
          exact={true}
          path="/admin/dashboard/orders"
          component={Orders}
        />
        {/* Admin Routes End */}

        {/* User Dashboard */}

<ProtectedRoute
  exact={true}
  path="/user/notifications"
  component={Notifications}
/>
<Route exact={true} path="/signup" component={Signup} />
<Route exact={true} path="/forgot-password" component={ForgotPassword} />
<Route exact={true} path="/contact-us" component={ContactUs} />
{/* <Route exact={true} path="/prduct" component={ProductCategoryDropdown}/> */}

        <ProtectedRoute
          exact={true}
          path="/user/profile"
          component={UserProfile}
        />
        <ProtectedRoute
          exact={true}
          path="/user/orders"
          component={UserOrders}
        />
        <ProtectedRoute
          exact={true}
          path="/user/setting"
          component={SettingUser}
        />
        {/* User Dashboard End */}

        {/* 404 Page */}
        <Route component={PageNotFound} />
      </Switch>
    </Router>
  );
};

export default Routes;
