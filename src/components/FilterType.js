import React, { useState, useEffect } from "react";
import { MultiSelect } from "react-multi-select-component";
import styles from './FilterType.module.css'

function FilterType(props) {

  const customValueRenderer = (selected, _options) => {
    return selected.length
      ? selected.length > 1
        ? `${selected[0]?.label}  + ${selected.length} More`
        : selected[0]?.label
      : "Select Type";
  };
  const options = [
    { label: "water", value: "water" },
    { label: "fire", value: "fire" },
    { label: "grass", value: "grass" },
    { label: "psychic", value: "psychic" },
    { label: "ghost", value: "ghost" },
    { label: "ground", value: "ground" },
    { label: "fighting", value: "fighting" },
    { label: "dragon", value: "dragon" },
    { label: "fairy", value: "fairy" },
    { label: "electric", value: "electric" },
    { label: "bug", value: "bug" },
    { label: "poison", value: "poison" },
    { label: "dark", value: "dark" },
    { label: "steel", value: "steel" },
    { label: "normal", value: "normal" },
    { label: "rock", value: "rock" },
    { label: "ice", value: "ice" },
    { label: "flying", value: "flying" },
    { label: "unknown", value: "unknown" },
    { label: "shadow", value: "shadow" },
  ];

  const [selected, setSelected] = useState([]);


  useEffect(() => {
    props.dynamicFilter(undefined,selected, undefined);
  }, [selected]);

  return (
    <div>
      <MultiSelect
        className={styles.input_srch}
        options={options}
        value={selected}
        onChange={setSelected}
        labelledBy="Select"
        hasSelectAll={false}
        valueRenderer={customValueRenderer}
        disableSearch={true}
      />
    </div>
  );
}

export default FilterType;
