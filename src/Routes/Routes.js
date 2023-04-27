import React from "react";
import { Route, Routes } from "react-router-dom";
import Loader from "../common/Loader";
import loadable from "@loadable/component";
const Dashboard = loadable(() => import("../pages/Dashboard"), {
    fallback: <Loader />,
  });
  const Nopage = loadable(() => import("./error"), {
    fallback: <Loader />,
  });
  const Production = loadable(() => import("../pages/Produnction"), {
    fallback: <Loader />,
  });
  const Ticket = loadable(() => import("../pages/Ticket"), {
    fallback: <Loader />,
  });
  const Sales = loadable(() => import("../pages/Sales"), {
    fallback: <Loader />,
  });
  const ForgotPassword = loadable(() => import("../pages/ForgotPassword"), {
    fallback: <Loader />,
  });
const PrivateRoutes=() => {
    return (
        <>
        <Routes>
            <Route  path="/dashboard" element={<Dashboard/>}/>
            <Route path="/sales" element={<Sales/>}/>
            <Route path="/production" element={<Production/>}/>
            <Route path="/ticket" element={<Ticket/>}/>
            <Route path="*" element={<Nopage />}/>
        </Routes>
        </>
    )
};
export default PrivateRoutes;