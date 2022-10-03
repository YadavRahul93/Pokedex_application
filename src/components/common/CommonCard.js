import { Card } from "react-bootstrap";
import styles from "./CommonCard.module.css";
import { Capitalize } from "../../utility/utility";

function CommonCard({ imgPokemon, name, id, type }) {
  let resultType = type.map((a) => a.type.name);
  return (
    <>
      <Card
        className={styles.card_main}
        style={{
          background:
            resultType.length > 1
              ? `linear-gradient(var(--bg-${resultType[0]}), var(--bg-${resultType[1]}))`
              : `var(--bg-${resultType[0]})`,
        }}
      >
        <div className={styles.card_img__container}>
          <Card.Img
            className={styles.card_img}
            variant="top"
            src={imgPokemon}
          />
        </div>
        <Card.Body>
          <Card.Title className={styles.card__title}>
            {Capitalize(name)}
          </Card.Title>
          {id && id.toString().length === 1 && (
            <Card.Text className={styles.card__text}>00{id}</Card.Text>
          )}
          {id && id.toString().length === 2 && (
            <Card.Text className={styles.card__text}>0{id}</Card.Text>
          )}
          {id && id.toString().length >= 3 && (
            <Card.Text className={styles.card__text}>{id}</Card.Text>
          )}
        </Card.Body>
      </Card>
    </>
  );
}

export default CommonCard;
