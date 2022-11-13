import React from "react";

import { FaHome } from "react-icons/fa";

function WannaSell() {
  return (
    <section
      data-aos="zoom-in"
      data-aos-duration="2000"
      className="hover:text-white text-sm font-bold text-[#E60516] fixed z-30 bottom-4 right-4 bg-white hover:bg-[#E60516] p-1 rounded-xl shadow-xl shadow-gray-800 cursor-pointer px-3"
    >
      <a href="https://www.whatsapp.com/catalog/34655718171/?app_absent=0">
        <h2 className="hidden md:flex">Quiero vender mi inmueble</h2>
        <FaHome className="flex md:hidden h-6 w-6" />
      </a>
    </section>
  );
}

export default WannaSell;
