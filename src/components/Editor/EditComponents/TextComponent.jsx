import React, { useState, useEffect } from "react";

const TextComponent = (props) => {
  const [text, setText] = useState(props.text);

  useEffect(() => {
    if (props.id) {
      const mapedArray = props.array.map(i => i.id === props.id ? ({...i,[props.setterKey]:text}): i);
      props.setter({ ...props.object, ['menuItems']: mapedArray });
    } else {
      props.setter({ ...props.values, [props.setterKey]: text });
    }
    
  }, [text]);
  return (
    <div className="flex m-1">
      <h3 className="p-1">{props.title}</h3>
      {props.title !== "Description" ? (
        <input
          type={"text"}
          value={text}
          placeholder={text}
          min={0}
          className="mx-2 p-1 focus:outline-none rounded-xl bg-gray-300 
          scroll text-gray-900 shadow-lg"
          onChange={(e) => setText(e.target.value)}
        />
      ) : (
        <textarea
          type={"text"}
          value={text}
          placeholder={text}
          min={0}
          className="m-1 p-2 focus:outline-none rounded-xl bg-gray-300 
        scroll text-gray-900 shadow-lg overflow-hidden"
          onChange={(e) => setText(e.target.value)}
        />
      )}
    </div>
  );
};

export default TextComponent;
