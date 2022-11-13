
import React from "react";
import { useCustom } from "../../context/CustomContext";

const Service = ({ item, values }) => {
  const { setOpen, setOpenedItem } = useCustom();

  const handleOpen = (item) => {
    if (item.price) {
      setOpenedItem(item);
      setOpen(true);
    }
  };
  return (
    <div
    data-aos="fade-up" data-aos-duration="1500"
      className="m-6 p-5 md:w-1/3 align-center rounded-3xl "
      style={{
        cursor: item.price? 'pointer': 'auto',
        background: 'white',
        color: values.cardTextColor,
      }}
      onClick={() => handleOpen(item)}
    >
      {item.image && (
        <img
          src={item.image}
          alt={item.title}
          className="object-cover w-40 h-40 m-auto rounded-md "
        />
      )}
      {item.price && <h5 className="my-2">{item.price}</h5>}
      <h3 className="font-bold text-2xl m-5 text-center text-black">{item.title}</h3>
      {item.price ? null : <h5 className="text-md">{item.description}</h5>}
    </div>
  );
};

function Services1({ productsValues }) {
  const { servicesValues } = useCustom();

  const data = productsValues || servicesValues;

  return (
    <>
      {data.visible && (
        <div
          className="grid-rows-2 pt-12"
          style={{
            background: data.color,
            color: data.textColor,
          }}
        >
          {/* <h2 className="font-bold text-3xl p-6">{data.title}</h2> */}
          <div className="flex flex-wrap place-content-around">
            {data.menuItems.map((item) => (
              <Service key={item.id} item={item} values={data} />
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default Services1;


