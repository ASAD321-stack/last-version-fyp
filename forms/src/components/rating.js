import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Navbar } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import HomePage from "./home";
import './rating.css';

const Rating = (props) => {
  //const history = useHistory();
  const { id } = useParams();
  const [user, setUser] = useState({ rating: "" });

  let name, value;
  const handleInputs = (e) => {
    name = e.target.name;
    value = e.target.value;

    setUser({ ...user, [name]: value })
  }


  const postRating = async (e) => {
    const { rating } = user;
    e.preventDefault();
    const res = await fetch('/rating/' + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        rating

      })
    });

    if (res.status === 422 || !res) {
      window.alert("please filled the required feild");
      console.log("Invalid Entry");
    }
    else {
      window.alert("Added");
      console.log("Registration successfull");
      // history.push('/myRide');
    }

  }



  return (
    <>
      <div className="header">
        <HomePage />
        <div class="rating-card">
          <div><h1>Rating</h1></div>
          <div class="rating">
            <div class="rate" name="rating" id="rating" value={user.rating} onChange={handleInputs}>
              <input type="radio" id="star5" name="rating" value="5" />
              <label for="star5" title="text">5 stars</label>
              <input type="radio" id="star4" name="rating" value="4" />
              <label for="star4" title="text">4 stars</label>
              <input type="radio" id="star3" name="rating" value="3" />
              <label for="star3" title="text">3 stars</label>
              <input type="radio" id="star2" name="rating" value="2" />
              <label for="star2" title="text">2 stars</label>
              <input type="radio" id="star1" name="rating" value="1" />
              <label for="star1" title="text">1 star</label>
            </div>
            <div className="ratingButton">
              <button type="button" class="btn btn-outline-dark" onClick={postRating}>Submit</button>
            </div>
          </div>
          <div class="row d-flex justify-content-center mt-100">
            <div class="col-md-6">
              <div class="progress blue"> <span class="progress-left"> <span class="progress-bar"></span> </span> <span class="progress-right"> <span class="progress-bar"></span> </span>
                <div class="progress-value">90%</div>
              </div>
              <div class="progress yellow"> <span class="progress-left"> <span class="progress-bar"></span> </span> <span class="progress-right"> <span class="progress-bar"></span> </span>
                <div class="progress-value">37.5%</div>
              </div>
            </div>
          </div>


          <div style={{ clear: "both" }}></div>
        </div>
      </div>
    </>
  )
}

export default Rating;