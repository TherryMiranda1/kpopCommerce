import React, {useState, useEffect} from 'react'

const RangeComponent = (props) => {
    const [volume, setVolume] = useState(props.volume);
  
    useEffect(() => {
      props.setter({ ...props.values, [props.setterKey]: volume });
    }, [volume]);
    return (
      <div className="flex">
        <h3>{props.title}</h3>
        <input
          type="range"
          value={volume}
          min={0}
          max={props.maxRange}
          className="m-1"
          onChange={(e) => setVolume(e.target.valueAsNumber)}
        />
        <h5>{props.volume}º</h5>
      </div>
    );
  };

export default RangeComponent