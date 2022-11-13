import React, { useState, useEffect } from "react";
import { ColorPicker, useColor } from "react-color-palette";

import "react-color-palette/lib/css/styles.css";
import { MdDoneOutline } from "react-icons/md";

const ColorComponent = (props) => {
  const [color, setColor] = useColor("hex", props.color);
  const [colorPicker, setColorPicker] = useState(false);
  const [hex, setHex] = useState(true);

  useEffect(() => {
    props.setter({ ...props.values, [props.setterKey]: color.hex });
  }, [color]);
  return (
    <div className="flex">
      <h3 className="p-1">{props.title}</h3>
      <div
        className="w-5 h-5 m-1 cursor-pointer rounded-md shadow-2xl hover:h-6 hover:w-6  border-solid border-gray-500"
        style={{ background: color.hex, border: "1px solid gray " }}
        onClick={() => setColorPicker(true)}
      />
      {colorPicker && (
        <div className="bg-white rounded-xl shadow-2xl">
          <ColorPicker
            width={230}
            height={100}
            color={color}
            onChange={setColor}
            hideHEX={hex}
            hideHSV
            hideRGB
          />
          <div className="flex place-content-around">
            <h3 className="cursor-pointer" onClick={() => setHex(!hex)}>
              {!hex ? "Hide Hex" : "Show Hex"}
            </h3>
            <MdDoneOutline
              className="m-1 p-1 text-green-500 bg-white rounded-full h-6 w-6 cursor-pointer hover:p-0"
              onClick={() => setColorPicker(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ColorComponent;
