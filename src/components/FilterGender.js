import React, { useState, useEffect } from "react";
import { MultiSelect } from "react-multi-select-component";

function FilterGender(props) {
  const customValueRenderer = (selected, _options) => {
    return selected.length
      ? selected.length > 1
        ? `${selected[0]?.label}  + ${selected.length} More`
        : selected[0]?.label
      : "No Items Selected";
  };
  const options = [
    { label: "male", value: "male" },
    { label: "female", value: "female" },
    { label: "genderless", value: "genderless" },
    
  ];

  const [selectedGen, setSelected] = useState([]);


  useEffect(() => {
    props.dynamicFilter(undefined, undefined, selectedGen);
  }, [selectedGen]);

  return (
    <div>
      <MultiSelect
        options={options}
        value={selectedGen}
        onChange={setSelected}
        labelledBy="Select"
        hasSelectAll={false}
        valueRenderer={customValueRenderer}
      />
    </div>
  );
}

export default FilterGender