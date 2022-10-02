import React from "react";
import Modal from "react-bootstrap/Modal";
import { useState, useEffect } from "react";
import CommonCard from "./common/CommonCard";
import { readMoreData, Capitalize, toFeet } from "../utility/utility";
import styles from "./DescriptionTile.module.css";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
function DescriptionTile({
  show,
  onHide,
  name,
  id,
  strengthInfo,
  despInfo,
  imgPokemon,
  type,
  height,
  weight,
  abilities,
}) {
  const [pokemonDesp, setPokemonDesp] = useState("");

  const getPokemonDescription = (despInfo) => {
    if (despInfo) {
      const description = new Set();
      despInfo.flavor_text_entries.forEach((element) => {
        if (element.language.name === "en")
          description.add(element.flavor_text);
      });
      setPokemonDesp([...description].join("").replace(/\n|\f/g, ""));
    }
  };

  useEffect(() => {
    getPokemonDescription(despInfo);
  }, [despInfo]);

  return (
    <>
      <Modal show={show} onHide={onHide} size="lg">
        <Modal.Body className={styles.modal_parent}>
          <div>
            <Row className={styles.modal__first_container}>
              <Col className="modal__img-section p-2" md={4} xs={6}>
                <CommonCard
                  imgPokemon={imgPokemon}
                  name={""}
                  id={""}
                  type={type}
                ></CommonCard>
              </Col>
              <Col
                md={8}
                xs={6}
                className={styles.modal__first_container__desp}
              >
                <div className={styles.modal__header_desk}>
                  <span className={styles.modal__headaer__title}>{name}</span>
                  {id && id.toString().length === 1 && (
                    <span className={styles.modal__header__id}>00{id}</span>
                  )}
                  {id && id.toString().length === 2 && (
                    <span className={styles.modal__header__id}>0{id}</span>
                  )}
                  {id && id.toString().length === 3 && (
                    <span className={styles.modal__header__id}>{id}</span>
                  )}
                  <button
                    type="button"
                    className={`btn-close ${styles.close__btn}`}
                    aria-label="Close"
                    onClick={onHide}
                  ></button>
                </div>
                <div className={styles.modal__header_mob}>
                  <p className={styles.modal__headaer__title}>{name}</p>
                  {id && id.toString().length === 1 && (
                    <p className={styles.modal__header__id}>00{id}</p>
                  )}
                  {id && id.toString().length === 2 && (
                    <p className={styles.modal__header__id}>0{id}</p>
                  )}
                  {id && id.toString().length === 3 && (
                    <p className={styles.modal__header__id}>{id}</p>
                  )}
                </div>
                <div className={styles.modal__header_mob__btn}>
                  <button
                    type="button"
                    className={`btn-close ${styles.close__btn}`}
                    aria-label="Close"
                    onClick={onHide}
                  ></button>
                </div>
                <div className={styles.modal__description}>
                  {pokemonDesp && <span>{readMoreData(pokemonDesp)}</span>}
                  {pokemonDesp?.trim()?.length > 300 ? (
                    <i data-tooltip={pokemonDesp} className={styles.top}>
                      readmore
                    </i>
                  ) : (
                    ""
                  )}
                </div>
              </Col>
            </Row>
            <div className={styles.modal__sec_container}>
              <Row className="d-flex ">
                <Col xs={6} md={3}>
                  <p className={styles.mini__header}>Height</p>
                  <p>{toFeet(height)}</p>
                </Col>
                <Col xs={6} md={3}>
                  <p className={styles.mini__header}>Weight</p>
                  <p>{weight / 10} kg</p>
                </Col>
                <Col xs={6} md={3}>
                  {despInfo.gender_rate === 3 ? (
                    <p className={styles.mini__header}>Gender</p>
                  ) : (
                    <p className={styles.mini__header}>Gender(s)</p>
                  )}
                  {despInfo.gender_rate === 3 ? (
                    <p className={styles.mini__header}>Genderless</p>
                  ) : (
                    <p>Male, Female</p>
                  )}
                </Col>
                <Col xs={6} md={3}>
                  <p className={styles.mini__header}>Egg Groups</p>
                  {despInfo &&
                    despInfo.egg_groups.map((e, index) => (
                      <span key={index + "zx"}>
                        {Capitalize(e.name)}
                        {despInfo.egg_groups.length !== index + 1 ? `, ` : ""}
                      </span>
                    ))}
                </Col>
                <Col xs={6} md={3}>
                  <p className={styles.mini__header}>Abilities</p>
                  {abilities.map((e, index) => (
                    <span key={`abili-${index}`}>
                      {Capitalize(e.ability.name)}
                      {abilities.length !== index + 1 ? `, ` : ""}
                    </span>
                  ))}
                </Col>
                <Col xs={6} md={3}>
                  <p className={styles.mini__header}>Types</p>
                  {type.map((e, index) => (
                    <span
                      key={`type-${index}`}
                      className={styles.enabled_color}
                      style={{
                        background: `var(--bg-${e.type.name})`,
                      }}
                    >
                      {Capitalize(e.type.name)}
                      {/* {type.length !== index + 1 ? `,` : ""} */}
                    </span>
                  ))}
                </Col>
                <Col xs={12} md={6}>
                  <p className={styles.mini__header}>Weak Against</p>
                  {strengthInfo?.damage_relations?.double_damage_from.map(
                    (e, index) => (
                      <span
                        className={styles.enabled_color}
                        key={`weak-${index}`}
                        style={{
                          background: `var(--bg-${e.name})`,
                        }}
                      >
                        {Capitalize(e.name)}
                        {/* {strengthInfo.damage_relations.double_damage_from
                          .length !==
                        index + 1
                          ? `,`
                          : ""} */}
                      </span>
                    )
                  )}
                </Col>
              </Row>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default DescriptionTile;
