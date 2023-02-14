import { Component } from "react";
import { getInfoPokedex } from "../services/data.services";
import { ModalPokemon } from "./ModalPokemon";
import { PokemonComponent } from "./PokemonComponent";

export class GlobalContainer extends Component{
  constructor(props){
    super(props)
    this.state = {
      pokedexData : [],
      modalStatus : false,
      modalPokemon:{
        info : {},
        name : ""
      }
        
    }
  }

  async componentDidMount(){
    getInfoPokedex().then(res =>{
      this.setState({pokedexData:[...res.data.results]})
    })
  }

  AffichageModalPokemon =(pokemon,name)=>{
    this.setState({modalStatus:true,modalPokemon : {info:{...pokemon},name:name}})
  }

  FermetureModalPokemon =()=>{
    this.setState({modalStatus:false,modalPokemonInfo:{}})
  }

  render(){
    return(
      <div className="GlobalContainer">
        {
          this.state.pokedexData.length === 0? <div>En chargement ....</div>
          :
          this.state.pokedexData.map((e,i)=><PokemonComponent key={i} pokemon={e} AffichageModalPokemon={this.AffichageModalPokemon}></PokemonComponent>)
        }

        {
          this.state.modalStatus && <ModalPokemon FermetureModalPokemon={this.FermetureModalPokemon} pokemonName={this.state.modalPokemon.name} modalPokemon={this.state.modalPokemon}></ModalPokemon>
        }
      </div>
    )
  }
}