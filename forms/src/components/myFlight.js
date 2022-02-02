import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import { Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import HomePage from "./home"
import axios from "axios"
//import { keys } from "@material-ui/core/styles/createBreakpoints";

import "./service.css"
const MyFlight = () => {
    const navigate = useNavigate();
    const [ads, getAds] = useState([]);
    const PF = "http://localhost:5000/images/"
    // const [search, setSearch] = useState('');
    // const [searcha, setSearcha] = useState('');
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
            console.log("=============ads");
            console.log(data);
            getAds(data);

            if (!response.status === 200) {
                const error = new Error(response.error);
                throw error;
            }
        } catch (err) {
            console.log(err);
            navigate('/login');
        }
    }

    const upDateRide = async (id) => {
        try {
            await axios.put(`/update/${id}`, {

            });
        } catch (err) { }
    };

    const deleteRide = async (id) => {
        axios.delete(`/delete/${id}`).then(() => {
            getUser(
                ads.filter((element) => {
                    return element._id !== id;
                })
            )
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
                <h1>Your Posted Flights</h1>
                {ads.map((element) =>
                    <div key={element.id}>


                        <div className=" back">
                            <h4>{element.loginName}</h4>
                            <img className="adsImage" style={{ "marginLeft": "570px" }} src={PF + element.image} onError={({ currentTarget }) => {
                                currentTarget.onerror = null; // prevents looping
                                currentTarget.src = "https://www.seekpng.com/png/detail/966-9665317_placeholder-image-person-jpg.png"
                            }} width="80" height="90" />

                            <section class=" services" id="services">
                                <div className="box row">
                                    <div className="col-md-4">
                                        <h5>Departure:<span>{element.departure}</span></h5>
                                        <h5>Destination:<span>{element.destination}</span></h5>

                                    </div>
                                    <div className="col-md-4">

                                        <h5>MeetupPoint :<span>{element.meetupPoint}</span></h5>
                                        <h5>Flight No: <span>{element.flightNo}</span></h5>


                                    </div>
                                    <div className="col-md-4">
                                        <h5>MeetingTime : <span>{element.time}</span></h5>
                                        <h5>Charges : <span>{element.charges}</span></h5>
                                        {/* <h5>Destination : <span>{d.destination}</span></h5> */}
                                    </div>

                                    <div className="col-md-6">
                                        <h5>Arrival Date:<span>{element.date}</span></h5>
                                    </div>
                                    <div className="col-md-6">
                                        <h5>Contact Number : <span>{element.number}</span></h5>
                                    </div>


                                    {/* <button className="button12 btn btn-sm btn-danger w-100 ml-2" onClick={() => {
                                 navigate("/update/" + element._id )
                             }}>Edit</button> */}
                                    <div className="button align-items-center" ><button style={{ "marginLeft": "550px" }} className="btn  btn-success "
                                        onClick={() => {
                                            deleteRide(element._id);
                                        }}
                                    >Delete</button>
                                        <button className="btn btn-danger w-70 ml-2" style={{ "marginLeft": "40px" }} onClick={() => {
                                            navigate("/update/" + element._id)
                                        }}>Edit</button>


                                    </div>





                                </div>


                            </section>

                        </div>



                        {/* </div> */}
                        {/* </div> */}
                        {/* </div> */}
                    </div>

                )}
            </div>

        </div>
    )
}
export default MyFlight;