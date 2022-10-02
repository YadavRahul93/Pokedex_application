import React from "react";
import { useState, useEffect } from "react";
import PokemonCard from "./PokemonCard";
import Row from "react-bootstrap/Row";
import { useDispatch, useSelector } from "react-redux";
import actions from "../redux/actions/actions";
import styles from "./Home.module.css";
import InfiniteScroll from "react-infinite-scroll-component";
import AllFilters from "./AllFilters";
import logo from "../assets/pokemon.gif";

function Home(props) {
  const [hasMore, setHasMore] = useState(true);
  const dispatch = useDispatch();

  const pokemonArr = useSelector((state) => state.reducer.pokemonList);
  const nextUrl = useSelector((state) => state.reducer.nextListUrl);
  const genderList = useSelector((state) => state.reducer.AllGenderList);

  useEffect(() => {}, [pokemonArr, hasMore]);

  const fetchMoreData = () => {
    if (pokemonArr.length === 100) {
      setHasMore(false);
    }
      dispatch(actions.pokemonAppendList(nextUrl, genderList));
  };

  return (
    <div className={styles.main_container}>
      <div className={styles.main_container__title_cont}>
        <p className={styles.main_container__title}>Pokédex</p>
        <p className={styles.main_container__descp}>
          {" "}
          Search for any Pokémon that exists on the planet
        </p>
      </div>
      <div className="w-100 p-3">
        <AllFilters></AllFilters>
      </div>
      <div className="m-0 p-1">
        <InfiniteScroll
          dataLength={pokemonArr.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={
            <div className={styles.logo_loader}>
              <img src={logo} alt="loading..." />
            </div>
          }
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>You have seen all Pokemons!</b>
            </p>
          }
        >
          <Row className="w-100 m-0">
            {pokemonArr.map((eachPokemon, index) => (
              <PokemonCard
                key={`num_${index}${eachPokemon.data.id}`}
                id={eachPokemon.data?.id}
                height={eachPokemon.data.height}
                weight={eachPokemon.data.weight}
                name={eachPokemon.data.name}
                type={eachPokemon.data.types}
                abilities={eachPokemon.data.abilities}
                imgPokemon={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${eachPokemon.data.id}.svg`}
              ></PokemonCard>
            ))}
          </Row>
        </InfiniteScroll>
      </div>
      {/* <Button variant="secondary" onClick={()=>{dispatch(actions.pokemonList(previousUrl))}}>Previous</Button>{" "}
      <Button variant="secondary" onClick={()=>{dispatch(actions.pokemonList(nextUrl))}}>Next</Button>{" "} */}
    </div>
  );
}

export default Home;
