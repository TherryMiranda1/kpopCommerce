import React, { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import { BiRightArrow, BiDownArrow } from "react-icons/bi";
import toast from "react-hot-toast";

import { useCustom } from "../../context/CustomContext";

// Edit Components
import {
  SwitchComponent,
  RangeComponent,
  ImageComponent,
  TextComponent,
  ColorComponent,
} from "./EditComponents/index";
import "./styles.css";

import items from "../../assets/items.png";
import other from "../../assets/other.png";
import text from "../../assets/text.png";
import color from "../../assets/color.png";

const STYLE_SECTIONS = [
  {
    id: 1,
    title: "Colores",
    iTitle: "Colors",
    image: color,
  },
  {
    id: 2,
    title: "Textos",
    iTitle: "Texts",
    image: text,
  },
  {
    id: 3,
    title: "Otros",
    iTitle: "Others",
    image: other,
  },
  {
    id: 4,
    title: "Items",
    iTitle: "Items",
    image: items,
  },
];

const SectionEdit = (props) => {
  const [collapsed, setCollapsed] = useState(true);
  const [section, setSection] = useState("Textos");

  return (
    <div className="text-sm font-semibold  m-1 p-2 place-content-around backdrop-blur-md bg-white/20 rounded-xl shadow-lg">
      <div className="flex  cursor-pointer">
        {!props.id && (
          <input
            type="checkbox"
            checked={props.values.visible}
            className="m-1"
            onChange={() =>
              props.setter({
                ...props.values,
                ["visible"]: !props.values.visible,
              })
            }
          />
        )}

        <div className="flex" onClick={() => setCollapsed(!collapsed)}>
          <h3 className="mx-10 ">{props.title}</h3>
          <div className="pt-1 content-end">
            {collapsed ? <BiRightArrow /> : <BiDownArrow />}
          </div>
        </div>
      </div>
      {!collapsed && (
        <div>
          {
            <div className="flex flex-wrap place-content-around m-2 ">
              {STYLE_SECTIONS.map((item) => (
                <div
                  key={item.id}
                  className="w-14 h-14 p-1 rounded-2xl cursor-pointer"
                  style={{
                    background:
                      section === item.title ? "white" : "transparent",
                    border: section === item.title ? "1px solid gray" : "none",
                  }}
                  onClick={() => setSection(item.title)}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-6 w-6 m-auto"
                  />
                  <h5 className="text-sm">{item.iTitle}</h5>
                </div>
              ))}
            </div>
          }
          {section === "Colores" && (
            <div className="bg-white p-1 rounded-xl m-2 shadow-2xl">
              {props.values.color && <h2>Colors</h2>}
              {props.values.textColor && (
                <ColorComponent
                  title={"Text Color"}
                  color={props.values.textColor}
                  values={props.values}
                  setter={props.setter}
                  setterKey={"textColor"}
                  id={props.id}
                  array={props.array}
                  object={props.object}
                />
              )}
              {props.values.color && (
                <ColorComponent
                  title={
                    props.values.gradient === true
                      ? "Gradient Color 1"
                      : "Background Color"
                  }
                  color={props.values.color}
                  values={props.values}
                  setter={props.setter}
                  setterKey={"color"}
                  id={props.id}
                  array={props.array}
                  object={props.object}
                />
              )}
              {props.values.cardColor && (
                <ColorComponent
                  title={"Card Color"}
                  color={props.values.cardColor}
                  values={props.values}
                  setter={props.setter}
                  setterKey={"cardColor"}
                  id={props.id}
                  array={props.array}
                  object={props.object}
                />
              )}
              {props.values.shadowColor && (
                <ColorComponent
                  title={"Shadow Color"}
                  color={props.values.shadowColor}
                  values={props.values}
                  setter={props.setter}
                  setterKey={"shadowColor"}
                  id={props.id}
                  array={props.array}
                  object={props.object}
                />
              )}

              {props.values.color2 && props.values.gradient === true && (
                <ColorComponent
                  title={"Gradient Color 2"}
                  color={props.values.color2}
                  values={props.values}
                  setter={props.setter}
                  setterKey={"color2"}
                  id={props.id}
                  array={props.array}
                  object={props.object}
                />
              )}
              {props.values.color3 && props.values.gradient === true && (
                <ColorComponent
                  title={"Gradient Color 3"}
                  color={props.values.color3}
                  values={props.values}
                  setter={props.setter}
                  setterKey={"color3"}
                  id={props.id}
                  array={props.array}
                  object={props.object}
                />
              )}
              {props.values.menuColor && (
                <ColorComponent
                  title={"Menu Color"}
                  color={props.values.menuColor}
                  values={props.values}
                  setter={props.setter}
                  setterKey={"menuColor"}
                  id={props.id}
                  array={props.array}
                  object={props.object}
                />
              )}

              {props.values.iconColor && (
                <ColorComponent
                  title={"Icon Color"}
                  color={props.values.iconColor}
                  values={props.values}
                  setter={props.setter}
                  setterKey={"iconColor"}
                  id={props.id}
                  array={props.array}
                  object={props.object}
                />
              )}
            </div>
          )}
          {section === "Textos" && (
            <div className="backdrop-blur-xl bg-white m-2 shadow-2xl rounded-lg p-1">
              {props.values.title !== undefined && (
                <TextComponent
                  title={"Title"}
                  values={props.values}
                  text={props.values.title}
                  setter={props.setter}
                  setterKey={"title"}
                  id={props.values.id}
                  array={props.array}
                  object={props.object}
                />
              )}
              {props.values.description !== undefined && (
                <TextComponent
                  title={"Description"}
                  values={props.values}
                  text={props.values.description}
                  setter={props.setter}
                  setterKey={"description"}
                  id={props.values.id}
                  array={props.array}
                  object={props.object}
                />
              )}
              {props.values.price !== undefined && (
                <TextComponent
                  title={"Price"}
                  values={props.values}
                  text={props.values.price}
                  setter={props.setter}
                  setterKey={"price"}
                  id={props.values.id}
                  array={props.array}
                  object={props.object}
                />
              )}
              {props.values.url !== undefined && (
                <TextComponent
                  title={"Url"}
                  values={props.values}
                  text={props.values.url}
                  setter={props.setter}
                  setterKey={"url"}
                  id={props.values.id}
                  array={props.array}
                  object={props.object}
                />
              )}
            </div>
          )}
          {section === "Otros" && (
            <div className="backdrop-blur-xl bg-white m-2 shadow-2xl rounded-lg p-1">
              {props.values.gradientAng !== undefined &&
                props.values.gradient === true && (
                  <RangeComponent
                    title={"Gradient Angle"}
                    volume={props.values.gradientAng}
                    values={props.values}
                    maxRange={360}
                    setter={props.setter}
                    setterKey={"gradientAng"}
                    id={props.id}
                    array={props.array}
                    object={props.object}
                  />
                )}
              {props.values.gradient !== undefined && (
                <SwitchComponent
                  title={"Gradient"}
                  checked={props.values.gradient}
                  values={props.values}
                  setter={props.setter}
                  setterKey={"gradient"}
                  id={props.id}
                  array={props.array}
                  object={props.object}
                />
              )}
              {props.values.blur !== undefined && (
                <SwitchComponent
                  title={"Blur"}
                  checked={props.values.blur}
                  values={props.values}
                  setter={props.setter}
                  setterKey={"blur"}
                  id={props.id}
                  array={props.array}
                  object={props.object}
                />
              )}
              {props.values.image !== undefined && (
                <ImageComponent
                  title={"Image"}
                  values={props.values}
                  image={props.values.image}
                  setter={props.setter}
                  setterKey={"image"}
                  id={props.values.id}
                  array={props.array}
                  object={props.object}
                />
              )}
            </div>
          )}
          {section === "Items" && (
            <div>
              {props.values.menuItems !== undefined && (
                <div className="backdrop-blur-xl bg-white  m-2 shadow-2xl rounded-lg p-2">
                  <h2>Items</h2>
                  {props.values.menuItems.map((item) => (
                    <SectionEdit
                      key={item.id}
                      title={item.title}
                      setter={props.setter}
                      values={item}
                      array={props.values.menuItems}
                      object={props.values}
                      id={item.id}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

function EditPannel({ setEdit }) {
  const {
    headerValues,
    setHeaderValues,
    bannerValues,
    setBannerValues,
    servicesValues,
    setServicesValues,
    servicesValuesPlus,
    setServicesValuesPlus,
    productsValues,
    setProductsValues,
    footerValues,
    setFooterValues,
    questionsValues,
    setQuestionsValues,
  } = useCustom();
  const [sections, setSections] = useState(false);

  const saveValues = () => {
    const pageValues = {
      headerValues,
      bannerValues,
      servicesValues,
      servicesValuesPlus,
      productsValues,
      footerValues,
      questionsValues,
    };
    window.localStorage.setItem(
      "pageValues",
      JSON.stringify([pageValues])
    );
    toast.success("Se ha guardado tu pagina");
  };

  return (
    <div className="w-full h-full">
      <div
        className="overflow-auto w-90vw tablet:w-60vw desktop:w-40vw backdrop-blur-md bg-black/20 rounded-md p-2 shadow-2xl"
        style={{ height: "90vh" }}
      >
        <MdClose
          onClick={() => setEdit(false)}
          className="w-6 h-6 cursor-pointer absolute"
        />
        <h2 className="mb-2 text-xl">Control pannel</h2>
        <SectionEdit
          title="NavBar"
          values={headerValues}
          setter={setHeaderValues}
          menuItems={headerValues.menuItems}
        />
        <SectionEdit
          title="Banner"
          values={bannerValues}
          setter={setBannerValues}
        />

        <SectionEdit
          title="Footer"
          values={footerValues}
          setter={setFooterValues}
        />

        <div>
          <h2
            className="mb-2 w-full cursor-pointer hover:font-bold"
            onClick={() => setSections(!sections)}
          >
            Sections
          </h2>
          {sections && (
            <div>
              <SectionEdit
                title="Services"
                values={servicesValues}
                setter={setServicesValues}
                menuItems={servicesValues.menuItems}
              />
              <SectionEdit
                title="About"
                values={servicesValuesPlus}
                setter={setServicesValuesPlus}
                menuItems={servicesValuesPlus.menuItems}
              />
              <SectionEdit
                title="Products"
                values={productsValues}
                setter={setProductsValues}
                menuItems={productsValues.menuItems}
              />
              <SectionEdit
                title="FAQs"
                values={questionsValues}
                setter={setQuestionsValues}
                menuItems={questionsValues.menuItems}
              />
            </div>
          )}
        </div>
      </div>
      <div
        className="absolute right-5 bottom-5 bg-green-500 p-1 px-2 rounded-xl cursor-pointer hover:bg-green-600"
        onClick={() => saveValues()}
      >
        <h3>Save</h3>
      </div>
    </div>
  );
}

export default EditPannel;
