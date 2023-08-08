import {useParams} from "react-router-dom";
import { useState } from "react";
import "./movieDetails.css";

function MovieDetails(props){
    let {movie} = useParams();

    let [userDetails,setUserDetails] = useState({
        username:"",
        email:""
    })

    let handleBooking = () =>{
        let headerInput = document.querySelectorAll("#dialog input")[0];
        headerInput.value = movie;
        let dialogElement = document.querySelector("#dialog");
        let openBookingButton = document.querySelector("#booking-button");
        let closeBookingButton = document.querySelector("#dialog button");
        openBookingButton.addEventListener("click",function(){
            dialogElement.showModal();
        })
        closeBookingButton.addEventListener("click",function(){
            dialogElement.close();
        })
    }

    let handleChange = (event) =>{
        let {name,value} = event.target;
        setUserDetails({
            ...userDetails,
            [name]:value
        })
    }

    let handleSubmit = () =>{
        let inputs = document.querySelectorAll("#dialog input")
        console.log(inputs)
        window.localStorage.setItem("user-details",JSON.stringify(userDetails));
        inputs.forEach(element =>{
            element.value="";
        })
        alert("Details stored and payment details will mailed soon!")
    }

    setTimeout(()=>{
        localStorage.clear();
    },5000)

    return(
        <div className="movie-detail-banner">
            <dialog id="dialog">
                <h1>Ticket booking!</h1>
                <form>
                    <label>Movie Name : </label>
                    <input type="text" value={movie}></input>
                    <br></br>
                    <label>Name : </label>
                    <input type="text" name="username" value={userDetails.username} onChange={handleChange} placeholder="Enter your name" required></input>
                    <br></br>
                    <label>E-mail : </label>
                    <input type="email" name="email" value={userDetails.email} onChange={handleChange} placeholder="Enter your email" required></input>
                    <br></br>
                    <button type="button" onClick={handleSubmit}>Book it!</button>
                </form>
            </dialog>
            {props.data.filter(elements=>elements.show.name === movie).map(elements=>(
                <div className="movie-detail-element">
                    <div className="movie-detail-image">
                        <img src={elements.show.image === null ? "/images/no-img.jpg" : elements.show.image.original}></img>
                    </div>
                    <div className="movie-details">
                        <h1>{elements.show.name}</h1>
                        <div dangerouslySetInnerHTML={{__html:elements.show.summary}}></div>
                        <p>Rating : {elements.show.rating.average}</p>
                        <p>Genre : {elements.show.genres[0]}</p>
                        <button id="booking-button" onClick={handleBooking}>Book your ticket!</button>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default MovieDetails;