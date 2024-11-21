import { habilidades } from '../../App';
import './player.css'

export default function player({ dado, player, mirror = false }) {

  const headingStyle = {
    color: player?.color ??"white"
  }

  return (
    <div id='contenedor-player'>
      <div id="contenedor-dado">
        <img src="/dado.jpeg" id="dado" />
        <span>{dado}</span>
      </div>
      <h2 style={headingStyle}>{player?.nombre ?? 'Personaje'}</h2>
      <div id="contenedor-corazones"
        style={{
          flexDirection: mirror ? 'row-reverse' : 'row'
        }}>
        <div id="corazones">
          {Array.from({ length: player?.vidas ?? 3 }).map((_, indice) => (
            <img
              key={indice}
              src='/corazones.jpeg' />
          ))}
        </div>
        {player?.imagen ? <img id="img-personaje" src={`/${player?.imagen}`} /> : <div id="img-personaje-placeholder" />}
      </div>
      <div id='estadisticas'>
        {habilidades.map((el, indice) => (
          <h3 key={indice} style={headingStyle}>
          {el} {player?.[el.toLowerCase()]}
          </h3>
        ))}
      </div>
    </div>
  )
}
