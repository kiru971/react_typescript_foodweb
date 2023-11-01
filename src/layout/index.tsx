import React, { useEffect, useState } from "react";
import { Outlet, useNavigate, useOutletContext } from "react-router-dom";
import SideBar from "../component/sidebar";
import Navbar from "../component/navbar";

type ContextType = {
  open: boolean;
};

const UserLayout = () => {
  const [open, setOpen] = useState<boolean>(true);
  const navigate = useNavigate();

  const handleClose = () => {
    setOpen(!open);
  };

  useEffect(() => {
    navigate("/home");
  }, []);

  return (
    <div className="flex w-full max-[750px]:flex-col">
      <Navbar />
      <SideBar open={open} handleClose={handleClose} />
      <Outlet context={{ open }} />
    </div>
  );
};

export default UserLayout;

export function useUser() {
  return useOutletContext<ContextType>();
}
