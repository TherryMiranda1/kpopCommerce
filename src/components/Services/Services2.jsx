import React from "react";
import { useCustom } from "../../context/CustomContext";
// tablet:w-1/3 laptop:w-1/4 desktop:w-1/5
const Service = ({ item, values }) => {
  const imageLeft = (num) => {
    if (num % 2 == 0) {
      return "left";
    } else {
      return "right";
    }
  };
  return (
    <div
      data-aos="fade-up"
      data-aos-duration="1500"
      className="m-8 p-2 w-56 h-96 items-center overflow-hidden"
      style={{
        boxShadow: `0px 0px 15px 1px ${values.shadowColor}`,
        background: values.cardColor,
        color: values.cardTextColor,
        // transform: `rotateZ(-1deg) `,
      }}
    >
      {item.image && (
        <img
          src={item.image}
          alt={item.title}
          className="p-2 object-contain rounded-full m-auto w-20"
        />
      )}
      <div className=" p-2">
        <h3 className="font-bold text-xl m-3">{item.title}</h3>
        <h5 className="text-md italic">{`" ${item.description} "`}</h5>
      </div>
    </div>
  );
};

function Services2() {
  const { servicesValuesPlus } = useCustom();
  return (
    <>
      {servicesValuesPlus.visible && (
        <div
          className=" p-5"
          style={{
            background: servicesValuesPlus.color,
            color: servicesValuesPlus.textColor,
          }}
        >
          <h2 className="font-bold text-2xl p-6">{servicesValuesPlus.title}</h2>
          <div className="flex flex-wrap place-content-around">
            {servicesValuesPlus.menuItems.map((item) => (
              <Service key={item.id} item={item} values={servicesValuesPlus} />
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default Services2;
