import React from "react";
import { useCustom } from "../../context/CustomContext";
import Header from "./Header";
import Menu from "./Menu";

function Navbar() {
  const { headerValues } = useCustom();
  return (
    <>
      {headerValues.visible && (
        <div
          className=" h-12 fixed w-full flex z-10"
          style={{
            background: '#E60516',
            backdropFilter: "blur(10px)",
          }}
        >
          <Header /> <Menu />
        </div>
      )}
    </>
  );
}

export default Navbar;
