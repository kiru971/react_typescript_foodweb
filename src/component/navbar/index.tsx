import React, { useState } from "react";
import SideBar from "../sidebar";
import { IoMdMenu } from "react-icons/io";

const Navbar = () => {
  const [show, setShow] = useState<boolean>(false);
  const handleShow = () => {
    setShow(!show);
  };
  return (
    <>
      <div className="min-[750px]:hidden bg-white p-3 mb-2">
        {/* <img
          src="../Good-food-logo-design-on-transparent-background-PNG.png"
          alt="logo"
          className="h-16 w-16 bg-slate-600"
          onClick={handleShow}
        /> */}
        <IoMdMenu onClick={handleShow} size={25} />
      </div>
      {show && <SideBar show={show} handleShow={handleShow} />}
    </>
  );
};

export default Navbar;
