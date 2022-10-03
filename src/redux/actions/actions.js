import axios from "axios";
import { fetchAllGender, getTypesSet } from "../../utility/service";

const fetchPokemonList = (list) => ({
  type: "POKEMON_LIST",
  payload: list,
});

const fetchNextUrl = (list) => ({
  type: "NEXT_LIST",
  payload: list,
});

const fetchPreviousUrl = (list) => ({
  type: "PREVIOUS_LIST",
  payload: list,
});

const fetchAllGenderList = (list) => ({
  type: "ALL_GENDER_LIST",
  payload: list,
});

const fetchAllTypesList = (list) => ({
  type: "ALL_TYPES_LIST",
  payload: list,
});

const appendList = (list) => ({
  type: "APPENED_LIST",
  payload: list,
});

const appendRefList = (list) => ({
  type: "APPENED_REF_LIST",
  payload: list,
});

const referenceList = (list) => ({
  type: "REFERENCE_LIST",
  payload: list,
});

const pokemonList = (baseUrl = null) => {
  if (!baseUrl) {
    baseUrl = "https://pokeapi.co/api/v2/pokemon";
  }
  return async (dispatch) => {
    const genderList = await fetchAllGender();
    const typesSet = await getTypesSet();
    await axios
      .get(baseUrl)
      .then((response) => {
        if (response.data.next !== null) {
          dispatch(fetchNextUrl(response.data.next));
        }
        if (response.data.previous !== null) {
          dispatch(fetchPreviousUrl(response.data.previous));
        }

        if (response.data.results && response.data.results.length) {
          Promise.all(
            response.data.results.map((endpoint) => axios.get(endpoint.url))
          ).then(
            axios.spread((...allData) => {
              allData.forEach((eachElement) => {
                genderList.map((e) => {
                  if (
                    eachElement.data.name === e.name &&
                    !eachElement.data.gender
                  ) {
                    eachElement.data.gender = [e.gender];
                  } else if (
                    eachElement.data.name === e.name &&
                    (eachElement.data.gender[0] === "male" ||
                      eachElement.data.gender[0] === "female")
                  ) {
                    eachElement.data.gender = ["male", "female"];
                  }
                });
              });
              dispatch(fetchAllGenderList(genderList));
              dispatch(fetchAllTypesList(typesSet));
              dispatch(fetchPokemonList(allData));
              dispatch(referenceList(allData));
            })
          );
        }
      })
      .catch((err) => console.log(err));
  };
};

const pokemonAppendList = (url, genderList) => {
  return async (dispatch) => {
    await axios
      .get(url)
      .then((response) => {
        dispatch(fetchNextUrl(response.data.next));
        Promise.all(
          response?.data?.results.map((endpoint) => axios.get(endpoint.url))
        ).then(
          axios.spread((...allData) => {
            allData.forEach((eachElement) => {
              genderList.map((e) => {
                if (
                  eachElement.data.name === e.name &&
                  !eachElement.data.gender
                ) {
                  eachElement.data.gender = [e.gender];
                } else if (
                  eachElement.data.name === e.name &&
                  (eachElement.data.gender[0] === "male" ||
                    eachElement.data.gender[0] === "female")
                ) {
                  eachElement.data.gender = ["male", "female"];
                }
              });
            });
            dispatch(appendList(allData));
            dispatch(appendRefList(allData));
          })
        );
      })
      .catch((err) => console.log(err));
  };
};

const replaceList = (payload) => {
  return (dispatch) => {
    return dispatch(fetchPokemonList(payload));
  };
};

const actions = {
  pokemonList,
  pokemonAppendList,
  replaceList,
};

export default actions;
