import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import FloorsPage from "./pages/FloorsPage";
import RoomsPage from "./pages/RoomsPage";
import TenentsPage from "./pages/TenentsPage";
import PaymentsTrackingPage from "./pages/PaymentsTrackingPage";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />}></Route>
      <Route path="/floors/:id" element={<FloorsPage />}></Route>
      <Route path="/rooms/:id" element={<RoomsPage />}></Route>
      <Route path="/tenents/:id" element={<TenentsPage />}></Route>
      <Route path="/:id/payments" element={<PaymentsTrackingPage/>}></Route>
    </Routes>
  );
};

export default AllRoutes;
