import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import {BrowserRouter,Routes,Route} from "react-router-dom"
import MovieData from './components/movie-data/movieData'
import MovieDetails from './components/movie-details/movieDetails'
import "./App.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faVideo } from '@fortawesome/free-solid-svg-icons'

function App() {

  let [movies,setMovies] = useState({
    data:null
  })
  let actualData;

  useEffect(()=>{
    axios.get("https://api.tvmaze.com/search/shows?q=all")
    .then(res=>{
      setMovies({
        data:res.data
      })
    })
    .catch(err=>console.log(err))
  },[])

  if(movies.data ===  null){
    return
  }
  else{
    actualData = movies.data
    console.log(actualData)
  }
  
  return (
   <div className="main-banner">
      <BrowserRouter>
        <div className="navbar">
          <h1>Movie-coms <FontAwesomeIcon icon={faVideo} className="icon"></FontAwesomeIcon></h1>
          <p className="main-para">Shows, sitcoms and all things movies!</p>
        </div>
        <Routes>
          <Route path="/" element={<MovieData data={actualData}/>}></Route>
          <Route path="/:movie" element={<MovieDetails data={actualData} />}></Route>
        </Routes>
      </BrowserRouter>
   </div>
  )
}

export default App
