import React, { useState } from "react";
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
  gender
}) {
  const [show, setShow] = useState(false);
  const [strengthInfo, setStrengthInfo] = useState("");
  const [despInfo, setDespInfo] = useState("");

  const getStrengthInfo = async (id) => {
    const fetchedData = await fetchStrengthWeakness(id);
    setStrengthInfo(fetchedData);
  };
  const getDesp = async (id) => {
    const fetchedData = await fetchPokemonDesp(id);
    setDespInfo(fetchedData);
  };

  return (
    <>
      <Col
        className="d-flex align-items-stretch mb-3"
        xs={6}
        md={2}
        onClick={() => {
          setShow(true);
          getStrengthInfo(id);
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
