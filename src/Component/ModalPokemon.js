



export function ModalPokemon (props){
  const importAll=(r)=> {
    let images = {};
    r.keys().forEach((item, index) => { 
      images[item.replace('./', '').replace('.png','')] = r(item); 
    });
    return images
  }

  const onClickBtn = ()=>{
    props.FermetureModalPokemon()
  }

  const images = importAll( require.context('../asset', false, /\.(png|jpe?g|svg)$/))
  const idpokemon = props.modalPokemon.info.species.url.split("/")
  return(
    <div className="modalBackground">
      <div className="modalContant">

        <div className="headerModalPokedex">
        <button className="fa-sharp fa-solid fa-xmark" onClick={onClickBtn}> </button>
        </div>

        <div className="divBorderLeft"></div>

        <div className="ContainerPokemonDisplay">
          <p>{props.pokemonName} n°: {idpokemon[6]}</p>
          <img src={props.modalPokemon.info.sprites.front_default} alt="un truc"></img>
        </div>
        <div>
          {
            props.modalPokemon.info.types.map((elem,i) =><img className="imgType" src={images["Type_"+elem.type.name]} key={i}></img>)
          }
        </div>

          <div className="divBorderRight"></div>

        <div className="footerModalPokedex">

        </div>
      </div>
    </div>
  )
}
