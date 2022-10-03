import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import DescriptionTile from "./DescriptionTile";
import Col from "react-bootstrap/Col";
import CommonCard from "./common/CommonCard";
import { fetchStrengthWeakness, fetchPokemonDesp } from "../utility/service";

function PokemonCard({
  id,
  name,
  imgPokemon,
  type,
  height,
  weight,
  abilities,
  gender,
}) {
  const [show, setShow] = useState(false);
  const [strengthInfo, setStrengthInfo] = useState([]);
  const [despInfo, setDespInfo] = useState("");
  const allTypeList = useSelector((state) => state.reducer.allTypesSet);

  const fetchStrengthWeakness = (type) => {
    let arrList = [];
    allTypeList.filter((e) =>
      type.some((x) => {
        if (x.type.name === e.name) {
          arrList.push(...e.weak_against);
        }
      })
    );

    const ids = arrList.map((o) => o.name);
    const filtered = arrList.filter(
      ({ name }, index) => !ids.includes(name, index + 1)
    );
    setStrengthInfo(filtered);
  };

  const getStrengthInfo = async (type) => {
    fetchStrengthWeakness(type);
  };

  const getDesp = async (id) => {
    const fetchedData = await fetchPokemonDesp(id);
    setDespInfo(fetchedData);
  };

  useEffect(() => {}, [strengthInfo]);

  return (
    <>
      <Col
        className="d-flex align-items-stretch mb-3"
        xs={6}
        md={2}
        onClick={() => {
          setShow(true);
          getStrengthInfo(type);
          getDesp(id);
        }}
      >
        <CommonCard
          imgPokemon={imgPokemon}
          name={name}
          id={id}
          type={type}
        ></CommonCard>
      </Col>
      <DescriptionTile
        name={name}
        id={id}
        show={show}
        dialogClassName="modal-90w"
        onHide={() => setShow(false)}
        strengthInfo={strengthInfo}
        despInfo={despInfo}
        imgPokemon={imgPokemon}
        type={type}
        height={height}
        weight={weight}
        abilities={abilities}
        gender={gender}
      ></DescriptionTile>
    </>
  );
}

export default PokemonCard;
