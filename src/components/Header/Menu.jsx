import React, { useState } from "react";
import { BiMenuAltRight, BiX } from "react-icons/bi";
import { useCustom } from "../../context/CustomContext";
import { useRouter } from "next/router";

function MenuItems({ setOpenMenu }) {
  const { headerValues } = useCustom();
  const router = useRouter();

  return (
    <div
      data-aos="fade-left"
      data-aos-duration="1500"
      className="p-10 h-[100vh]"
      style={{ background: '#E60516' }}
    >
      {headerValues.menuItems.map((item) => (
        <div key={item.id} className="p-2 m-2 cursor-pointer">
          <h3
            className="text-white text-lg font-bold"
            onClick={() => {
              router.push(item.url);
              setOpenMenu(false);
            }}
          >
            {item.title}
          </h3>
        </div>
      ))}
    </div>
  );
}

function Menu() {
  const { headerValues } = useCustom();
  const [openMenu, setOpenMenu] = useState(false);
  return (
    <div className="absolute right-0 z-20 ">
      <div onClick={() => setOpenMenu(!openMenu)}>
        {openMenu ? (
          <BiX
            className="absolute h-9 w-9 right-0 m-1 cursor-pointer z-30"
            style={{ color: 'white' }}
          />
        ) : (
          <BiMenuAltRight
            className="h-9 w-9 m-1 cursor-pointer"
            style={{ color: 'white' }}
          />
        )}
      </div>
      {openMenu && <MenuItems setOpenMenu={setOpenMenu} />}
    </div>
  );
}

export default Menu;
