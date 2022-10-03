import axios from "axios";

export async function getTypesSet() {
  let allType = [];
  await axios.get(`https://pokeapi.co/api/v2/type`).then(async (res) => {
    const lists = await Promise.all(
      res.data.results.map((e) =>
        axios.get(e.url).then((r) => {
          let arrList = r?.data?.damage_relations?.double_damage_from.filter(
            (s) => [].push(s.name)
          );
          return {
            name: r?.data?.name,
            weak_against: arrList,
          };
        })
      )
    );
    allType = lists;
  });
  return allType;
}

export async function fetchPokemonDesp(id) {
  const data = await axios
    .get(`https://pokeapi.co/api/v2/pokemon-species/${id}`)
    .then((res) => res.data)
    .catch((err) => console.log(err));
  return data;
}

export async function fetchAllGender() {
  let genderArr = [];
  const data = await axios
    .get(`https://pokeapi.co/api/v2/gender/3/`)
    .then((res) => {
      return res.data.pokemon_species_details.map((eachSpieces) => {
        return {
          name: eachSpieces.pokemon_species.name,
          gender: "genderless",
        };
      });
    })
    .catch((err) => console.log(err));
  genderArr = [...genderArr, ...data];

  const dataMale = await axios
    .get(`https://pokeapi.co/api/v2/gender/1/`)
    .then((res) => {
      return res.data.pokemon_species_details.map((eachSpieces) => {
        return {
          name: eachSpieces.pokemon_species.name,
          gender: "male",
        };
      });
    })
    .catch((err) => console.log(err));

  genderArr = [...genderArr, ...dataMale];

  const dataFemale = await axios
    .get(`https://pokeapi.co/api/v2/gender/2/`)
    .then((res) => {
      return res.data.pokemon_species_details.map((eachSpieces) => {
        return {
          name: eachSpieces.pokemon_species.name,
          gender: "female",
        };
      });
    })
    .catch((err) => console.log(err));
  genderArr = [...genderArr, ...dataFemale];

  return genderArr;
}
