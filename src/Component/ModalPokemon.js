import { useEffect, useState } from "react";
import { getInfoPokemon } from "../services/data.services";

export function ModalPokemon (props){
  const importAll=(r)=> {
    let images = {};
    r.keys().forEach((item) => { 
      images[item.replace('./', '').replace('.png','')] = r(item); 
    });
    return images
  }

  const onClickBtn = ()=>{
    props.FermetureModalPokemon()
  }

  const [PokemonEncounter,setPokemonEncounter]=useState()
  const urlPokemonEncounter = "https://pokeapi.co/api/v2/pokemon/"+props.pokemonName+"/encounters"

  useEffect(()=>{
    getInfoPokemon(urlPokemonEncounter).then(res => setPokemonEncounter(res.data))
    return()=> setPokemonEncounter([])
    },[urlPokemonEncounter])

  const images = importAll( require.context('../asset', false, /\.(png|jpe?g|svg)$/))
  const idpokemon = props.modalPokemon.info.species.url.split("/")

  console.log(PokemonEncounter)
  return(
    <div className="modalBackground">
      <div className="modalContant">

        <div className="headerModalPokedex">
        <button className="fa-sharp fa-solid fa-xmark" onClick={onClickBtn}> </button>
        </div>

        <div className="containerPokemonDisplay">
          <p>{props.pokemonName} n°: {idpokemon[6]}</p>
          <img src={props.modalPokemon.info.sprites.front_default} alt="un truc"></img>
        </div>

        <div className="containerPokemonType">
          {
            props.modalPokemon.info.types.map((elem,i) =><img src={images["Type_"+elem.type.name]} key={i} alt="pokemonDisplay"></img>)
          }
          <h4>Abilities :</h4>
          <ul>
            {
              props.modalPokemon.info.abilities.map((elem,i)=><li key={i}>{elem.ability.name}</li>)
            }
          </ul>
        </div>

        <div className="containerEncounter">
          <h4>Encounters :</h4>
            <ul>
            {
              PokemonEncounter&& PokemonEncounter.map((elem,i)=><li key={i}>{elem.location_area.name}</li>)
            }
            </ul>
        </div>

        </div>
      </div>
  )
}
