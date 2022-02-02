import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Navbar } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import './search.css'
import HomePage from "./home"
// const moment = require('moment');
import StarOutlineIcon from '@material-ui/icons/StarOutline';

const SendRequest = () => {
    const navigate = useNavigate();
    const PF = "http://localhost:5000/images/"
    const [ads, getAds] = useState([]);
    const [text, setText] = useState(false);
    const getUser = async () => {
        try {
            const response = await fetch('/getRequest', {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                credentials: "include"
            });

            const data = await response.json();
            console.log("=============myRequests");
            getAds(data)
            console.log(data);

            if (!response.status === 200) {
                const error = new Error(response.error);
                throw error;
            }
        } catch (err) {
            console.log(err);
            navigate('/login');
        }
    }
    const accept = async () => {
        setText(true);
    }
    const deleteRide = async (id) => {
        fetch(`/cancel/${id}`, {
            method: 'DELETE'
        }).then(() => {
            getUser(
                ads.filter((item) => {
                    return item._id !== id;
                })
            )

        })
        window.location.reload(false);
    }
    useEffect(() => {
        getUser();
        //   deleteRide();
    }, []);
    return (
        <div className="header">
            <HomePage />
            <div className="px-5">
                <div className="row text-center">

                    {ads.map((element) =>
                        <div className="col-md-4 mt-5 mb-5" key={element.id}>
                            <div className="card-login">
                                <div className="d-flex align-items-center">
                                    <div className="box ml-3 w-100">
                                        <img className="adsImage" src={PF + element.image} onError={({ currentTarget }) => {
                                            currentTarget.onerror = null; // prevents looping
                                            currentTarget.src = "https://www.seekpng.com/png/detail/966-9665317_placeholder-image-person-jpg.png"
                                        }} width="80" height="80" />
                                        <h4 className="">{element.loginName}</h4>
                                        <h3 className="trainer-name-title">{element.name}&ensp;<StarOutlineIcon />{element.rating}</h3>
                                        <div className="origin">
                                            <div> <span>departure:</span><span className="origin1">{element.departure}</span> </div>
                                            <div> <span >Destination:</span> <span className="destination1">{element.destination}</span> </div>
                                        </div>
                                        <hr class="dashed"></hr>
                                        <div className="origin">
                                            <div> <span>Date:</span> <span className="origin1">{element.date}</span> </div>
                                            <div> <span>Time:</span> <span className="destination1">{element.time}</span> </div>
                                        </div>
                                        <button className="btn btn-sm btn-success w-100 ml-2" onClick={() => {
                                            navigate("/rating/" + element.loginId)
                                        }}>Give Rating</button>
                                    </div>
                                </div>
                            </div>


                            {element.requests.map((c, i) => (

                                <div className="mt-5 mb-5" key={i}>
                                    <div className="card-login">
                                        <div className="d-flex align-items-center">
                                            <div className="box ml-3 w-100">
                                                <img className="adsImage" src={PF + c.image} onError={({ currentTarget }) => {
                                                    currentTarget.onerror = null; // prevents looping
                                                    currentTarget.src = "https://www.seekpng.com/png/detail/966-9665317_placeholder-image-person-jpg.png"
                                                }} width="80" height="80" />
                                                <h4 className="trainer-name-title">{c.name}</h4>
                                                <div className="origin">
                                                    <div> <span>Number:</span><span className="origin1">{c.number}</span> </div>

                                                </div>
                                                <hr class="dashed"></hr>
                                                <div className="origin">


                                                    <button className="btn btn-sm btn-success w-100 ml-2" onClick={() => {
                                                        deleteRide(c._id);
                                                    }}>Cancel</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                    )
                    }
                </div>
            </div>
        </div>

    );
}
export default SendRequest;