import React, { useState } from "react";
import { useCustom } from "../../context/CustomContext";

const Product = ({ item, values, setOpen, setOpenedItem }) => {
  return (
    <div
    data-aos="fade-right" data-aos-duration="1500"
      className="cursor-pointer align-center rounded-md "
      style={{
        boxShadow: `0px 0px 15px 1px ${values.shadowColor}`,
        background: 'white',
        color: values.cardTextColor,
        width: "400px",
      }}
      onClick={() => {
        setOpenedItem(item);
        setOpen(true);
      }}
    >
      {item.image && (
        <img
          src={item.image}
          alt={item.title}
          className=" object-cover h-44 rounded-md"
          style={{ width: "400px" }}
        />
      )}
      <div className="p-3 flex flex-col overflow-hidden">
        <h3 className="font-bold text-md text-black">{item.title}</h3>
        <h5 className="font-bold">{item.price}</h5>
      </div>
      
    </div>
  );
};

function Products1() {
  const { productsValues, setOpen, setOpenedItem } = useCustom();

  return (
    <>
      {productsValues.visible && (
        <div
          className="marquee"
          style={{
            background: productsValues.color,
            color: productsValues.textColor,
          }}
        >
          <h2 className="font-bold text-3xl p-6 ">Oportunidades</h2>
          <div className="carrousel">
            {productsValues.menuItems.map((item) => (
              <Product
                key={item.id}
                item={item}
                values={productsValues}
                setOpen={setOpen}
                setOpenedItem={setOpenedItem}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default Products1;
