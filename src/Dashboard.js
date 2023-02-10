import React, { useEffect,useState,useRef } from 'react';
import "./Dashboard.css";
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFloppyDisk, faPenToSquare, faPlus, faSearch, faTrash, faXmark  } from '@fortawesome/free-solid-svg-icons'

export default function Dashboard() {

  const [pokemons,setPokemons] = useState([]);
  const [searchPokemon,setSearchPokemon]= useState("");

  const [rangeValueAtaque,setRangeValueAtaque]=useState(0);
  const [rangeValueDefensa,setRangeValueDefensa]=useState(0);

  const [pokeInfo,setPokeInfo]= useState({
    Nombre:'',
    Imagen:'',
    Ataque:'',
    Defensa:'',
  })


  const peticionGet=async ()=>{
     const res = await axios.get("https://63e17fbd65b57fe6065987c7.mockapi.io/api/Pokemon/");
     console.log(res.data)
     setPokemons(res.data)
  }

  const peticionPost=(event)=>{
    event.preventDefault();

    axios.post('https://63e17fbd65b57fe6065987c7.mockapi.io/api/Pokemon/',pokeInfo)
    .then((res)=>{
      console.log(res.data)
    })
    .catch((error)=>{
      console.error(error);
    });
    window.location.reload(false);
  };

  useEffect(()=>{
    peticionGet();
  },[])

  const ref= useRef(null);

  const handleScroll=()=>{
    ref.current?.scrollIntoView({behavior:'smooth'})
  }

  const handleInputNombre=(event)=>{
    setPokeInfo({
      ...pokeInfo,
      Nombre:event.target.value,
    });
  };

  const handleInputImagen=(event)=>{
    setPokeInfo({
      ...pokeInfo,
      Imagen:event.target.value,
    });
  };

  const handleInputAtaque=(event)=>{
    setPokeInfo({
      ...pokeInfo,
      Ataque:event.target.value,
    });
    setRangeValueAtaque(event.target.value)
  }

  const handleInputDefensa=(event)=>{
    setPokeInfo({
      ...pokeInfo,
      Defensa:event.target.value,
    });
    setRangeValueDefensa(event.target.value)
  }

  return (
    <div className='DashboardBox'>
      <div className='DashboardContainer'>
        <p>Listado de Pokemon</p>
        <div className='searchBarAndButtonBox'>
          <div className='searchBarAndButtonContainer'>
            <div className='search-container'>
              <FontAwesomeIcon icon={faSearch} className='fa-icon'/>
              <input placeholder='Buscar' onChange={(e)=>setSearchPokemon(e.target.value)} className='box'/>
            </div>
            <div> 
              <button>
              <FontAwesomeIcon icon={faPlus} onClick={handleScroll} /> Nuevo</button>
            </div>
          </div>
        </div>

        <div className='TableContainer'>
          <table border="1">
            <tbody>
              <tr className='headertable'>
                <td>Nombre</td>
                <td>Imagen</td>
                <td>Ataque</td>
                <td>Defensa</td>
                <td>Acción</td>
              </tr>
              <>
              {/* eslint-disable-next-line */}
              {pokemons.filter((pokemon)=>{
                if(searchPokemon === ""){
                  return pokemon
                } else if (pokemon.Nombre.toLowerCase().includes(searchPokemon.toLowerCase() )){
                  return pokemon
                }
              }).map(pokemon=>{
                return(
                  <tr>
                    <td>{pokemon.Nombre}</td>
                    <td><img src={pokemon.Imagen} alt={pokemon.Nombre}/></td>
                    <td>{pokemon.Ataque}</td>
                    <td>{pokemon.Defensa}</td>
                    <td>   
                      <FontAwesomeIcon icon={faPenToSquare} style={{color: "#5d5fdc",marginRight:'5px'}} size="xl"/>
                      <FontAwesomeIcon icon={faTrash} style={{color: "#5d5fdc",marginLeft:'5px'}} size="xl"/>
                    </td>
                  </tr>
                )
              })}
              </>
            </tbody>
          </table>
        </div>

        <div className='nuevoPokemonForm' ref={ref}>
          <p className='tituloForm'>Nuevo Pokemon</p>
          <form  onSubmit={peticionPost}>
            <div className='inputContainers'>
              <div className='FilaInputs'>
                <div className='infoContainer'>
                  <p>Nombre:</p>
                  <input  
                    className='infoInput box' 
                    name="inputNombre" 
                    onChange={handleInputNombre} 
                    value={pokeInfo.inputNombre}/>
                </div>

                <div className='rangeContainer'>
                  <p>Ataque:</p>
                  <p>0</p>
                  <input 
                    type='range'
                    name="inputAtaque"  
                    min={1} 
                    max={100} 
                    step="1" 
                    onChange={handleInputAtaque}
                    value={pokeInfo.inputAtaque}
                    />
                  <p>{rangeValueAtaque}</p>
                </div>

              </div>

              <div className='FilaInputs'>
                <div className='infoContainer'>
                  <p>Imagen:</p>
                  <input className='infoInput box'
                  name="inputImagen" 
                  onChange={handleInputImagen} 
                  value={pokeInfo.inputImagen}
                  />
                </div>

                <div className='rangeContainer'>
                  <p>Defensa:</p>
                  <p>0</p>
                  <input 
                    type='range'
                    name="inputDefensa"  
                    min={1} 
                    max={100} 
                    step="1" 
                    onChange={handleInputDefensa}
                    value={pokeInfo.inputDefensa}
                    />
                  <p>{rangeValueDefensa}</p>
                </div>
              </div>

            </div>

            <div className='buttonsContainer'>
              <button><FontAwesomeIcon icon={faFloppyDisk} /> Guardar</button>
              <button><FontAwesomeIcon icon={faXmark} /> Cancelar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
