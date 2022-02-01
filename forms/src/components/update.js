import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import './login.css'
import 'bootstrap/dist/css/bootstrap.css';
import HomePage from "./home"


const Update = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [departure, setDeparture] = useState('');
    const [destination, setDestination] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [number, setNumber] = useState('');
    const [registration, setRegistration] = useState('');
    const [meetupPoint, setMeetupPoint] = useState('');
    const [charges, setCharges] = useState('');
    const [ads, setAds] = useState('');



    const PostData = async (e) => {
        e.preventDefault();
        //const {departure,destination,date,time,number,registration,color,meetupPoint,charges};
        const res = await fetch('/update/' + id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                departure, destination, date, time, number, registration, meetupPoint, charges

            })
        });
        if (res.status === 422 || !res) {
            window.alert("please filled the required feild");
            console.log("Invalid Entry");
        }
        else {
            window.alert("Added");
            console.log("Registration successfull");
            navigate('/myFlight');
        }

    }

    const getUser = async () => {
        try {
            const response = await fetch('/getData/' + id, {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                credentials: "include"
            });

            const data = await response.json();
            setAds(data);
            setDeparture(data.departure);
            setDestination(data.destination);
            setDate(data.date);
            console.log(date);
            setTime(data.time);
            setNumber(data.number);
            setRegistration(data.registration);
            setMeetupPoint(data.meetupPoint);
            setCharges(data.charges);



            if (response.status !== 200) {
                const error = new Error(response.error);
                throw error;
            }
        } catch (err) {
            console.log(err);
            // history.push('/login');
        }
    }
    useEffect(() => {
        getUser();
    }, []);


    return (
        <div className="header">
        <HomePage />

                <div className="body d-flex justify-content-center  align-content-center h-100">

                    <div className="card card-upload">
                        <div className="card-header">
                            <h2>Flight Details</h2>
                        </div>
                        <div className="card-body">
                            <form method="POST">
                                <div className="feilds">
                                    <div className="input-group form-group">
                                        <div className="input-group-prepend">

                                        </div>
                                        <select name="departure" className="form-control" placeholder="Departure" value={departure} onChange={(e) => setDeparture(e.target.value)} >
                                            <option value="">From</option>
                                            <option value="Pakistan">Pakistan</option>
                                            <option value="India">India</option>
                                            <option value="America">America</option>
                                            <option value="Spain">Spain</option>
                                            <option value="Dubai">Dubai</option>
                                            <option value="Canada">Canada</option>
                                            <option value="Afganistan">Afganistan</option>
                                        </select>


                                    </div>
                                </div>


                                <div className="feilds">
                                    <div className="input-group form-group">
                                            <select name="destination" className="form-control" placeholder="destination" value={destination}   onChange={(e) => setDestination(e.target.value)} >
                                            <option value="">From</option>
                                            <option value="Pakistan">Pakistan</option>
                                            <option value="India">India</option>
                                            <option value="America">America</option>
                                            <option value="Spain">Spain</option>
                                            <option value="Dubai">Dubai</option>
                                            <option value="Canada">Canada</option>
                                            <option value="Afganistan">Afganistan</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="feilds">
                                    <div className="input-group form-group">
                                        <div className="input-group-prepend">

                                        </div>
                                        <input type="date" name="date" id="date" className="form-control"
                                            value={date}
                                            onChange={(e) =>
                                                setDate(e.target.value)}
                                            placeholder="Date"></input>
                                    </div>
                                </div>
                                <div className="feilds">
                                    <div className="input-group form-group">
                                        <div className="input-group-prepend">

                                        </div>
                                        <input type="time" name="time" id="time" className="form-control"
                                            value={time}
                                            onChange={(e) =>
                                                setTime(e.target.value)}
                                        ></input>
                                    </div>
                                </div>
                                <div className="feilds">
                                    <div className="input-group form-group">
                                        <div className="input-group-prepend">

                                        </div>
                                        <input type="Number" name="number" id="number" className="form-control"
                                            value={number}
                                            onChange={(e) =>
                                                setNumber(e.target.value)}
                                            placeholder="Enter Phone Number"></input>
                                    </div>
                                </div>
                                <div className="feilds">
                                    <div className="input-group form-group">
                                        <div className="input-group-prepend">

                                        </div>
                                        <input type="text" name="registration" id="registration" className="form-control"
                                            value={registration}
                                            onChange={(e) =>
                                                setRegistration(e.target.value)}
                                            placeholder="Registration Number"></input>
                                    </div>
                                </div>
                                <div className="feilds">

                                </div>
                                <div className="feilds">
                                    <div className="input-group form-group">
                                        <div className="input-group-prepend">

                                        </div>
                                        <input type="text" name="meetupPoint" id="meetupPoint" className="form-control"
                                            value={meetupPoint}
                                            onChange={(e) =>
                                                setMeetupPoint(e.target.value)}
                                            placeholder="Enter the Meetup Point"></input>
                                    </div>
                                </div>
                                <div className="feilds">
                                    <div className="input-group form-group">
                                        <div className="input-group-prepend">

                                        </div>
                                        <input type="text" name="charges" id="charges" className="form-control"
                                            value={charges}
                                            onChange={(e) =>
                                                setCharges(e.target.value)} placeholder="Enter the Charges"></input>
                                    </div>
                                </div>
                                <div className="feilds">
                                    <div className="form-group">
                                        <input style={{ "backgroundColor": "green", "color": "white", "marginTop": "10px" }} type="submit" name="upload" id="Upload" value="Upload" type="submit" name="upload" id="Upload" value="UPDATE"
                                            onClick={PostData}
                                            className="btn float-right login_btn"></input>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
        </div>


    );
}


export default Update;