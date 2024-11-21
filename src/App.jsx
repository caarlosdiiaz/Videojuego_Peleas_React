import { useState } from 'react';
import './App.css'
import Player from './components/player/player';

export const habilidades = ['Fuerza', 'Destreza', 'Suerte'];

const personajes = [
  {
    nombre: 'Agua',
    fuerza: 50,
    destreza: 30,
    suerte: 10,
    color: 'blue',
  },
  {
    nombre: 'Dragon',
    fuerza: 35,
    destreza: 35,
    suerte: 20,
    color: 'brown',
  },
  {
    nombre: 'fuego',
    fuerza: 25,
    destreza: 20,
    suerte: 45,
    color: 'orange',
  },
  {
    nombre: 'Veneno',
    fuerza: 20,
    destreza: 40,
    suerte: 25,
    color: 'darkgreen'
  }
];

const estadoInicial = {
  estado: null,
  dado1: null, 
  dado2: null,
  habilidad: null,
  jugador1: null,
  jugador2: null,
}

export default function App() {
  //crear hook
  const [juego, setJuego] = useState(estadoInicial);

  const finDelJuego = juego?.jugador1?.vidas === 0 || juego?.jugador2?.vidas === 0

  function seleccionarPersonaje(indice) {
    let clave = null
    if(!juego.jugador1) clave = 'jugador1'
    else if(!juego.jugador2) clave = 'jugador2'
    if(!clave) return
    setJuego({
      ...juego,
      dado1: 1,
      dado2: clave === 'jugador2' ? 1 : null,
      [clave]: {
        ...personajes[indice],
        vidas: 3,
        imagen: `${indice + 1}.jpeg`
      }
    })
  }

  function seleccionarHabilidad () {
    if (finDelJuego || juego.estado=="resolucion" || !juego.jugador1 || !juego.jugador2) return

    const indiceAleatorio = Math.floor(Math.random() * habilidades.length)

    setJuego({
      ...juego,
      estado: "resolucion",
      habilidad: habilidades[indiceAleatorio]
    })
  }

  function manejarResolucion() {
    if (!juego.habilidad || juego.estado == "pelea") return
    const numeroAleatorio1 = Math.floor(Math.random()*100)+1
    const numeroAleatorio2 = Math.floor(Math.random()*100)+1

    const valor1 = juego.jugador1[juego.habilidad.toLowerCase()] + numeroAleatorio1
    const valor2 = juego.jugador2[juego.habilidad.toLowerCase()] + numeroAleatorio2

    setJuego({
      ...juego,
      estado: "pelea",
      dado1: numeroAleatorio1,
      dado2: numeroAleatorio2,

      jugador1: {
        ...juego.jugador1,
        vidas: valor1 < valor2 ? juego.jugador1.vidas -1 : juego.jugador1.vidas
      },
      jugador2: {
        ...juego.jugador2,
        vidas: valor2 < valor1 ? juego.jugador2.vidas -1 : juego.jugador2.vidas
      }
    })
  }

  function reiniciar() {
    setJuego(estadoInicial)
  }

  return (
    <div id="contenedor">
      {
        (!juego.jugador1 || !juego.jugador2) ? (
        <div className='personajes'>
        {Array.from({ length: 4 }).map((_, indice) =>(
          <img
            key={indice}
            src={`/${indice + 1}.jpeg`}
            onClick={() => seleccionarPersonaje(indice)}
          />
        ))}
      </div>
      ):(
        <h1>Pelea por: {juego.habilidad}</h1>
      )
      }
      <div id='jugadores'>
      <Player dado={juego.dado1} player={juego.jugador1}/>
      <Player dado={juego.dado2} player={juego.jugador2} mirror/>
      </div>
      <div id="botones">      
        <button onClick={seleccionarHabilidad}>Pelea</button>
        <button onClick={manejarResolucion}>Resolución</button>
        <button onClick={reiniciar}>Reiniciar</button>
      </div>
    </div>
  )
}