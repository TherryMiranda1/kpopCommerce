import React, { useState, useEffect } from "react";

const ImageComponent = (props) => {
  const [base64String, setBase64String] = useState(props.image);

  useEffect(() => {
    if (props.id) {
      const mapedArray = props.array.map((i) =>
        i.id === props.id ? ({...i,[props.setterKey]:base64String}) : i
      );
      props.setter({ ...props.object, ['menuItems']: mapedArray });
    } else {
      props.setter({ ...props.values, [props.setterKey]: base64String });
    }
  }, [base64String]);

  const convertImage = (file) => {
    var thisFile = file;
    var reader = new FileReader();
    reader.onloadend = function () {
      setBase64String(reader.result);
    };
    reader.readAsDataURL(thisFile);
  };

  return (
    <div className="flex">
      <h3>{props.title}</h3>
      <input
        type="file"
        className="rounded-xl m-1 border-none"
        onChange={(e) => convertImage(e.target.files[0])}
      />
      {base64String && (
        <img src={base64String} alt="image" className="rounded-md w-8 h-8" />
      )}
      <h5>{props.volume}</h5>
    </div>
  );
};

export default ImageComponent;
