import {Link} from 'react-router-dom'
import "./movieData.css"

function MovieData(props){
    return(
        <div className="movie-data-banner">
            {props.data.map(elements=>(
                <div className="movie-element">
                    <div className="movie-image">
                        <img src={elements.show.image === null ? "/images/no-img.jpg" : elements.show.image.original}></img>
                    </div>
                    <div className="movie-data">
                        <h1>{elements.show.name}</h1>
                        <h3>Score : {((elements.score)*100).toFixed(0)} %</h3>
                        <p>Language : {elements.show.language}</p>
                        <button><Link to={`/${elements.show.name}`} className="link">Read more!</Link></button>
                    </div>
                </div>   
            ))}
        </div>
    )
}

export default MovieData;