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

  const searchEncounter=()=>{
    if(!testUrl){
      setTestUrl(true)
      getInfoPokemon(urlPokemonEncounter).then(res => {
        if(res.data.length === 0){
          setPokemonEncounter([{location_area:{name:"No encounter..."}}])
        }
        else{
          setPokemonEncounter(res.data)
        }
      })
    }
  }

  const [PokemonEncounter,setPokemonEncounter]=useState([])
  const [testUrl,setTestUrl] = useState(false)
  const urlPokemonEncounter = "https://pokeapi.co/api/v2/pokemon/"+props.pokemonName+"/encounters"

  useEffect(()=>{
    searchEncounter()
    return()=> {
      setPokemonEncounter([])
      setTestUrl(false)
    }
    },[])

  const images = importAll( require.context('../asset', false, /\.(png|jpe?g|svg)$/))
  const idpokemon = props.modalPokemon.info.species.url.split("/")
  console.log(PokemonEncounter)
  return(
    <div className="modalBackground">
      <div className="modalContant">

        <div className="headerModalPokedex">
        <button className="fa-sharp fa-solid fa-xmark" onClick={onClickBtn}> </button>
        </div>
        <div className="rondBlanc"></div>
        <div className="containerPokemonDisplay">
          <p>{props.pokemonName} n°: {idpokemon[6]}</p>
          <img src={props.modalPokemon.info.sprites.front_default} alt="un truc"></img>
        </div>

        <div className="containerPokemonType">
          <h4 className="titleTypes">Types :</h4>
          {
            props.modalPokemon.info.types.map((elem,i) =><img src={images["Type_"+elem.type.name]} key={i} alt="pokemonDisplay"></img>)
          }
          <h4 className="titleAbilities">Abilities :</h4>
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
              PokemonEncounter.length >0 ? PokemonEncounter.map((elem,i)=><li key={i}>{elem.location_area.name}</li>)
              :
              <li>Loading ...</li>
              }
            </ul>
        </div>

        </div>
      </div>
  )
}
