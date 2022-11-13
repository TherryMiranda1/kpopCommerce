import React, { useState } from "react";
import { useCustom } from "../../context/CustomContext";
import { GoPlus } from "react-icons/go";

const Product = ({ item, values, page }) => {
  const [open, setOpen] = useState(page);
  return (
    <div
      data-aos="zoom-in"
      data-aos-duration="2000"
      className=" align-center rounded-sm m-1 p-4"
      style={{
        boxShadow: page ? "none" : `0px 0px 15px 1px ${values.shadowColor}`,
        background: values.cardColor,
        color: values.cardTextColor,
      }}
    >
      <div
        onClick={() => setOpen(!open)}
        className="flex place-content-evenly cursor-pointer relative m-3"
      >
        <h3 className="font-bold text-xl pr-10">{item.title}</h3>
        {!page && <GoPlus className="absolute w-5 h-5 right-4" />}
      </div>
      {open && (
        <div className="p-6" style={{ background: "rgba(255, 255, 255, 0.2)" }}>
          <h3 className="font-normal text-md">{item.description}</h3>
        </div>
      )}
    </div>
  );
};

function Products2({ page }) {
  const { questionsValues } = useCustom();
  return (
    <>
      {questionsValues.visible && (
        <div
        className="w-full"
          style={{
            background: questionsValues.color,
            color: questionsValues.textColor,
          }}
        >
          <h2 className="font-bold text-3xl p-6  ">{questionsValues.title}</h2>
          <div className="place-content-center mx-6 m-2">
            {questionsValues.menuItems.map((item) => (
              <Product
                key={item.id}
                item={item}
                values={questionsValues}
                page={page}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default Products2;
