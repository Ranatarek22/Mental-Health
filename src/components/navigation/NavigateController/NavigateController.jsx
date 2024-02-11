import React, { useEffect } from "react";
import Sidebar from "../SideBar/sidebar";
import { useLocation } from "react-router-dom";
import { main_routes } from "../../../routes/routes";
import AppHeader from "../NavBar/navbar";
// const main_routes = ["/", "/login", "/signup"];
const NavigateController = (props) => {
  const loc = useLocation();
  //   console.log(loc);
  const { setPathname } = props;
  const pathname = loc.pathname;
  useEffect(() => {
    setPathname(loc.pathname);
  }, [loc.pathname]);
  return <>{main_routes.includes(pathname) ? <AppHeader /> : <Sidebar />}</>;
};

export default NavigateController;
