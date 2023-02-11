import React from 'react'
import '../styles/card.scss'

function Card({ data }) {
  return (
    <div className="card shrink-0 max-w-[90%] md:mx-4">
      <img src={data.thumbnail} alt="picnic spot" />
      <div className="place-card__content">
        <h4 className="place-card__name">{data.name} </h4>
        <h5 className="place-card__author invisible md:visible">{data.author}</h5>
        <p className='postedon  invisible md:visible'>
          {data.postedon}
        </p>
        <button onClick={() => showmap(data.id, 'mapid')}>Show on
          map</button>
      </div>
      <div className="place-card__map" id={data.id}>
        <span onClick={() => hide(data.id)}>&times;</span>
        <iframe title={data.name} className="place-card__map_iframe" src="" frameBorder="1"></iframe>
      </div>
    </div>

  )

  function showmap(id, coord) {
    console.log(coord)
    const map_div = document.getElementById(id);
    map_div.classList.add("map_div_open")
    map_div.querySelector("iframe").src = coord
  }

  function hide(id) {
    const map_div = document.getElementById(id);
    map_div.classList.remove("map_div_open")
  }


}

export default Card
