import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Navbar } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import './service.css'
import './popup.css';
import HomePage from "./home"
import StarOutlineIcon from '@material-ui/icons/StarOutline';




const MyRequest = () => {
    const history = useNavigate();
    const PF = "http://localhost:5000/images/"
    const [ads, getAds] = useState([]);
    const [text, setText] = useState(false);
    const getUser = async () => {
        try {
            const response = await fetch('/myRide', {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                credentials: "include"
            });


            const data = await response.json();
            console.log("=============myRequests");
            console.log(data);
            getAds(data);

            if (!response.status === 200) {
                const error = new Error(response.error);
                throw error;
            }
        } catch (err) {
            console.log(err);
            history('/login');
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
                    item.requests.filter((items) => {
                        return items._id !== id;
                    })
                })
            )
            window.location.reload(false);
        })

    }
    useEffect(() => {
        getUser();
        deleteRide();
    }, []);
    return (
        <div className="header">
            <HomePage />
            <div className="px-5">
                <div className="row text-center">

                    {ads.map((element) =>
                        <div className="col-12 col-md-4 mt-5" key={element.id}>
                            <div className="card-login">
                                <div className="d-flex align-items-center">
                                    <div className="box ml-3 w-100">

                                        <h4 className="trainer-name-title">{element.loginName}</h4>
                                        <div className="origin">
                                            <div> <span>Origin:</span><span className="origin1">{element.departure}</span> </div>
                                            <div> <span >Destination:</span> <span className="destination1">{element.destination}</span> </div>
                                        </div>
                                        <hr class="dashed"></hr>
                                        <div className="origin">
                                            <div> <span>Date:</span> <span className="origin1">{element.date}</span> </div>
                                            <div> <span>Time:</span> <span className="destination1">{element.time}</span> </div>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            {element.requests.map((c, i) => (

                                <div className="col-12 col-md-4 mt-5" key={i}>
                                    <div className="card-login">
                                        <div className="d-flex align-items-center">
                                            <div className="box ml-3 w-100">
                                            <img className="adsImage" src={PF + c.image} onError={({ currentTarget }) => {
                                                    currentTarget.onerror = null; // prevents looping
                                                    currentTarget.src = "https://www.seekpng.com/png/detail/966-9665317_placeholder-image-person-jpg.png"
                                                }} width="80" height="80" />
                                             <h3 className="mb-0 mt-0 ">{c.name}&ensp;<StarOutlineIcon/>{c.rating}</h3>
                                                <div className="origin">
                                                    <div> <span>Number:</span><span className="origin1">{c.number}</span> </div>

                                                </div>
                                                <hr class="dashed"></hr>
                                                <div className="origin">
                                                
                                                        <Link to="/payment"><button type="button" className="btn btn-sm btn-success w-100 ml-2">Package Deliver</button></Link>
                                                     &ensp;
                                                    <button className="btn btn-sm btn-success w-100 ml-2" onClick={() => {
                                                        deleteRide(c._id);
                                                    }}>Cancel</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* <div className="card-login">
                                                        <div className="d-flex align-items-center">
                                                            <div className="ml-3 w-100">
                                                                <div className="origin">
                                                                    <div> <span>Name:</span><span className="origin1">{c.name}</span> </div>
                                                                    <div> <span >Contact No:</span> <span className="destination1">{c.number}</span> </div>
                                                                    <div> <span >No of Passenger:</span> <span className="destination1">{c.passenger}</span> </div>
                                                                    {text ?<>
                                                                         <a href="#popup1">End Trip</a>
                                                                         <div id="popup1" class="overlay">
                                                                             <div class="popup">
                                                                                 <h2>Payment</h2>
                                                                                 <a class="close" href="#">&times;</a>
                                                                                 <>
                                                                                     <Link to="/payment"><button type="button" className="buttonPopup">Cash </button></Link>
                                                                                     <button type="button" className="buttonPopup">Credit </button>
                                                                                 </>
             
                                                                             </div>
                                                                         </div></>
                                                                        : <button className="button12" onClick={() => {
                                                                            accept(c._id);
                                                                        }}>Accept</button>
                                                                    }
                                                                    <button className="button1" onClick={() => {
                                                                        deleteRide(c._id);
                                                                    }}>Cancel</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div> */}
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
export default MyRequest;
