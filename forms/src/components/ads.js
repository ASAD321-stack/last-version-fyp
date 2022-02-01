import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
//import { keys } from "@material-ui/core/styles/createBreakpoints";
// import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import HomePage from "./home";
import "./search.css"
import StarOutlineIcon from '@material-ui/icons/StarOutline';

const Ads = () => {
    const navigate = useNavigate();
    const PF = "http://localhost:5000/images/"
    const [ads, getAds] = useState([]);
    const [text, setText] = useState(false);
    const [search, setSearch] = useState('');
    const [searcha, setSearcha] = useState('');

    const getUser = async () => {
        try {
            const response = await fetch('/rideDetails', {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                credentials: "include"
            });

            getAds(await response.json());

            const data = response.body;
            console.log("=============ads");
            setText(true);
            
            console.log(data.image);

            if (response.status !== 200) {
                const error = new Error(response.error);
                throw error;
            }
        } catch (err) {
            console.log(err);
            navigate('/login');
        }
    }

    const request = async (id) => {
        const response = await fetch(`/request/${id}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
              
            })
        });
        console.log(response.status);
        if (response.status === 200 || !response) {
            window.alert("Request Sent");
            setText(true);

        }

        else if (response.status === 208) {
            window.alert("Already Sent");
        }
        
    }
    useEffect(() => {
        getUser();
        request();
    }, []);
 
    return (
        <div>
            <HomePage />
            <div className="search">
            <div className="searchbar">
                <input type="text" placeholder="Departure"
                    onChange={event => { setSearch(event.target.value) }}
                />
            
                <input type="text" placeholder="Destination"
                    onChange={event => { setSearcha(event.target.value) }}
                />
            </div>
            </div>


            <div className=" mt-5 ">
                <div className="row text-center">
                    {ads.filter((val) => {
                        if (search === "" && searcha === "") {
                            return val;
                        }
                        else if (val.departure.toLowerCase().includes(search.toLowerCase()) && val.destination.toLowerCase().includes(searcha.toLowerCase())) {
                            return val;
                        }
                    }).map((element) => {
                        return (
                            <div className=" col-12 col-md-12" key={element.id}>
                                <div className="px-3">
                                <img className="adsImage" src={PF + element.image} onError={({ currentTarget }) => {
                                                    currentTarget.onerror = null; // prevents looping
                                                    currentTarget.src = "https://www.seekpng.com/png/detail/966-9665317_placeholder-image-person-jpg.png"
                                                }} width="80" height="80" />
                                        <h3 className="mb-0 mt-0 ">{element.loginName}&ensp;<StarOutlineIcon/>{element.rating}</h3>
                                        <div className="back">
                                            <section class="services" id="services">
                                                <div className="box row ">
                                                    <div className="col-md-4 ">
                                                        <h5>Departure :<span>{element.departure}</span></h5>
                                                        <h5>Destination:<span>{element.destination}</span></h5>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <h5>Contact Number : <span>{element.number}</span></h5>
                                                        <h5>MeetupPoint :<span>{element.meetupPoint}</span></h5>
                                                       
                                                    </div>
                                                    <div className="col-md-4">
                                                        <h5>MeetingTime : <span>{element.time}</span></h5>
                                                        <h5>Charges : <span>{element.charges}</span></h5>
                                                        {/* <h5>Destination : <span>{d.destination}</span></h5> */}
                                                    </div>
                                                    <div className="col-md-6">
                                                        <h5>Flight No: <span>{element.flightNo}</span></h5>    
                                                    </div>
                                                    <div className="col-md-6">
                                                         <h5>Arrival Date:<span>{element.date}</span></h5>
                                                    </div>
                                                    <div className=""><button className="btn btn-sm btn-success w-100 ml-2" onClick={() => {
                                                        request(element._id);
                                                    }}>Request</button> </div>



                                                </div>

                                            </section>


                                        </div>
                                </div>
                            </div>
                        )

                    })

                    }

                </div>
            </div>
        </div>
    );
}
export default Ads;