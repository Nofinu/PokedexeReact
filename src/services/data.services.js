import axios from 'axios'

const urlapi ="https://pokeapi.co/api/v2/pokemon?limit=10&offset=0";

export const getInfoPokedex = () =>{
  return axios.get(urlapi);
}

export const getInfoPokemon = (urlPokemon)=>{
  return axios.get(urlPokemon);
}