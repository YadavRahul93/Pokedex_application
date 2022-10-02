const initialState = {
    pokemonList : [],
    AllGenderList : [],
    referenceList: [],
    nextListUrl: '',
    previousListUrl: ''
};

const reducer = ( state = initialState, {type, payload}) =>{
    switch(type){
        case "POKEMON_LIST":
            return {
                ...state,
                pokemonList : payload
            }
        case "ALL_GENDER_LIST":
            return {
                ...state,
                AllGenderList : payload
            }
        case "NEXT_LIST":
            return {
                ...state,
                nextListUrl : payload
            }
        case "PREVIOUS_LIST":
            return {
                ...state,
                previousListUrl : payload
            }
        case "REFERENCE_LIST":
            return {
                ...state,
                referenceList : payload
            }
        case "APPENED_LIST":
            return {
                ...state,
                pokemonList : [...state.pokemonList.concat(payload)]
            }
        case "APPENED_REF_LIST":
            return {
                ...state,
                referenceList : [...state.referenceList.concat(payload)]
            }
        default:
            return state
    }
}

export default reducer