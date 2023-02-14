import { Component } from "react";
import { getInfoPokemon } from "../services/data.services";


export class PokemonComponent extends Component{
  constructor(props){
    super(props)
    this.state = {
      pokemonData : {},
    }
  }

  componentDidMount(){
    getInfoPokemon(this.props.pokemon.url).then(res => {
      this.setState({pokemonData : {...res.data}})
    })
  }

  onClickDiv=()=>{
    const pokemonData = {...this.state.pokemonData}
    this.props.AffichageModalPokemon(pokemonData,this.props.pokemon.name)
  }

  render(){
    return(
      <div className="pokemonContainer" onClick={this.onClickDiv}>
        <p className="pokemonTitle">{this.props.pokemon.name}</p>
        {
          this.state.pokemonData.sprites && <img src={this.state.pokemonData.sprites.front_default} alt={ this.props.pokemon.name}></img>
        }
      </div>
    )
  }
}