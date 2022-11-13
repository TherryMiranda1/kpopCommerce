import React from "react";

function ProfilePage(props) {
  return (
    <div
      data-aos="zoom-in"
      data-aos-duration="2000"
      className="w-full text-md p font-bold pt-14 "
    >
      <h2 className="text-2xl">Sobre Nosotros</h2>
      <div className=" align-center rounded-xl m-auto w-90vw shadow-2xl p-6 shadow-black">
        <div className="flex m-4">
          <h3 className="font-bold text-md text-gray-600 px-4">Email</h3>
          <h3 className="font-bold italic text-md">
            {" "}
            danielmartinezg@gmail.com
          </h3>
        </div>
        <div className="flex m-4">
          <h3 className="font-bold text-md text-gray-600 px-4">Telefono</h3>
          <h3 className="font-bold italic text-md"> 655 71 81 71</h3>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
