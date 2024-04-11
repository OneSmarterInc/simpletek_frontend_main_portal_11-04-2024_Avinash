import React from "react";
import { Routes, Route } from "react-router-dom";
import NewTab from "../components/AccountDetails/NewTab";
import ViewBill from "../components/ViewBill";
import Logo from "../components/Logo";
import ViewContract from "../components/ViewContract";
import Login from "../Authentication/Login";
import SignUp from "../Authentication/SignUp";
import AccountDetails from "../components/AccountDetails/AccountDetails";
import Home from "../components/Home";
import PrivateRoute from "../components/PrivateRoute";
import AdminSidebar from "../components/AdminSidebar";
import PaymentSidebar from "../components/PaymentPortal/PaymentSidebar"
import UploadBatch from "../components/PaymentPortal/UploadBatch";

const MainRoutes = () => {
  return (
    <Routes>
      <Route element={<PrivateRoute />}>
        <Route path="/newtab/:company/:vendor/:ban" element={<NewTab />} />
      </Route>
      <Route element={<PrivateRoute />}>
        <Route
          ute
          path="/viewbills/:company/:vendor/:ban"
          element={<ViewBill />}
        />
      </Route>
      <Route element={<PrivateRoute />}>
        <Route
          path="/viewcontract/:company/:vendor"
          element={<ViewContract />}
        />
      </Route>
      {/* Note: Later make authentecations in Protected Routes */}
      <Route path="/login" element={<Login />}></Route>
      <Route path="/signup" element={<SignUp />}></Route>
      <Route element={<PrivateRoute />}>
        <Route path="/" element={<Home />} />
      </Route>

      <Route element={<PrivateRoute />}>
        <Route path="/paymentportal" element={<PaymentSidebar />} />
      </Route>

      <Route element={<PrivateRoute />}>
        <Route path="/uploadbatch" element={<UploadBatch />} />
      </Route>

      <Route path="*" element={<h3>Page Not Found</h3>} />

      
    </Routes>
  );
};

export default MainRoutes;
