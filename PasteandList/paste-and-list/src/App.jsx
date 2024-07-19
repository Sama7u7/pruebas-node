import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const[cancion, setCancion] = useState('')
  const[canciones, setCanciones] = useState([])

  const options = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': '829dda4988mshc5abe39246a14c5p1013ddjsn1f6fea7fde77',
      'x-rapidapi-host': 'spotify23.p.rapidapi.com'
    }
  };

  function handleSearch(e) {
    e.preventDefault()
    if(cancion.trim() === ''){
      alert('No escribiste el nombre de una cancion')
      return
    }
    console.log(cancion)
    setCancion('')
    getSong(cancion)
  }


  async function getSong(cancion) {
    try {
      let url = `https://spotify23.p.rapidapi.com/search/?q=${cancion}&type=multi&offset=0&limit=10&numberOfTopResults=5`
      let data = await fetch(url, options)
      let res = await data.json()
      setCanciones(res.tracks.items)
      console.log(res.tracks.items)
    }catch (error) {
      console.error(" ups.. error", error)
  }
  }
  return (
    <>
      <h1>Paste and list</h1>
      <form onSubmit={handleSearch}>
        <input type="text" value={cancion} onChange={(e) => setCancion(e.target.value)} />
        <button type="submit">Buscar</button>
      </form>
      {canciones.map((cancion, index) => (
        <div key={index}>
          <img src={cancion.data.albumOfTrack.coverArt.sources[0].url} />
          <h2>{cancion.data.name}</h2>
          <p>{cancion.data.artists.items.map(artist => artist.profile.name).join(', ')}</p>
        </div>
      ))}
    </>
  );
}

export default App
