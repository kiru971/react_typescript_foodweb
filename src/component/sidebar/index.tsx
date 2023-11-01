import React, { useEffect, useState } from "react";
import { AiOutlineClose, AiOutlineHome, AiOutlineMail } from "react-icons/ai";
import { GiBackwardTime } from "react-icons/gi";
import { NavLink } from "react-router-dom";
import { IconType } from "react-icons";
import { PiArrowLineRightBold } from "react-icons/pi";
import { PiArrowLineLeft } from "react-icons/pi";
import { props } from "../../modal/model";

const SideBar = ({ open, handleClose, show, handleShow }: props) => {
  type SideList = {
    id: number;
    title: string;
    icon: IconType;
    path: string;
  };
  const data: SideList[] = [
    { id: 1, title: "HOME", icon: AiOutlineHome, path: "/home" },
    { id: 2, title: "ORDER HISTORY", icon: GiBackwardTime, path: "/order" },
    { id: 3, title: "STATISTICS", icon: AiOutlineMail, path: "/statistics" },
  ];

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (windowWidth > 750 && show) {
      handleShow?.();
    }
  }, [windowWidth, show, handleShow]);

  return (
    <div
      className={`${open ? "w-[300px]" : "w-[100px]"} bg-white max-[750px]:${
        show ? "block w-[300px] max-[350px]:w-[250px] z-50" : "hidden"
      } fixed h-screen`}
    >
      <button
        style={{
          left: open ? "280px" : "85px",
        }}
        className="fixed top-[23px] p-2 z-[99999] bg-slate-200 border rounded-md cursor-pointer max-[750px]:hidden"
      >
        {!open ? (
          <PiArrowLineRightBold
            size={16}
            color="skyblue"
            onClick={handleClose}
          />
        ) : (
          <PiArrowLineLeft size={16} onClick={handleClose} />
        )}
      </button>
      <div className="flex justify-end pt-2 pr-2 min-[750px]:hidden">
        <AiOutlineClose color="black" onClick={handleShow} />
      </div>
      <div className="flex justify-center mb-10 min-[750px]:p-5 min-[750px]:mb-5">
        {open || show ? (
          <img src="../Logo text.png" alt="logo" />
        ) : (
          <img
            src="../images (2).jpeg"
            alt="logo"
            className="bg-white h-16 w-16"
          />
        )}
      </div>
      <div>
        {data.map((val) => {
          return (
            <NavLink
              to={val.path}
              className={({ isActive }) =>
                isActive
                  ? `flex items-center gap-5 ${
                      open || show ? "px-5" : "px-3"
                    } py-2 mx-5 mb-6 cursor-pointer  border border-[#F95E07] rounded-lg text-[#F95E07]`
                  : `flex items-center gap-5 ${
                      open || show ? "px-5" : "px-3"
                    } py-2 mx-5 mb-6 cursor-pointer`
              }
              key={val.id}
            >
              <p className="text-3xl">
                <val.icon />
              </p>
              {(open || show) && (
                <div className="list-none font-medium text-black ">
                  {val.title}
                </div>
              )}
            </NavLink>
          );
        })}
      </div>
    </div>
  );
};

export default SideBar;
