import React, {useEffect, useState} from 'react'

const SwitchComponent = (props) => {
    const [checked, setChecked] = useState(props.checked);
  
    useEffect(() => {
      props.setter({ ...props.values, [props.setterKey]: checked });
    }, [checked]);
    return (
      <div className="flex">
        <h3>{props.title}</h3>
        <input
          type="checkbox"
          checked={checked}
          className="m-1"
          onChange={() => setChecked(!checked)}
        />
      </div>
    );
  };

export default SwitchComponent