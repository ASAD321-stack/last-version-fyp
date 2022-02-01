import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './login.css';
import HomePage from "./home"
import './profile.css';


const Profile = () => {
    const navigate = useNavigate();
    const PF = "http://localhost:5000/images/"
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');   
    const [userNumber, setUserNumber] = useState('');   
    const [userImage, setUserImage] = useState('');
    const [data, setData] = useState('');
   const [newUser , setNewUser] =useState({
       photo: '',
   })


    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('photo' , newUser.photo);
        console.log(newUser.photo);

        axios.put('/profile' , formData)
        .then(res => {
            console.log(res);
        })
        .catch(err => {
            console.log(err);
        });
    }

    const handlePhoto = (e) => {
        setNewUser({...newUser,photo:e.target.files[0]});
        console.log(newUser.photo);
    }


    const getData = async () => {

        try {
            const res = await fetch('/home', {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                credentials: "include",
            });

            console.log(' catching error ------ Body---------------------');
            const data = await res.json();
            setData(data)
            setUserName({ username: data.rootUser.username });
            setUserEmail({ email: data.rootUser.email });
            setUserNumber({number:data.rootUser.number});
            setUserImage({image: data.rootUser.image})
           
            console.log(res.status);
        } catch (err) {
            console.log(err);
            console.log(' redirect --==-=-=-=-=-=-=-=-=-=-=--==-=-=');
            navigate('/login');

        }
    }
    useEffect(() => {
        getData();
    }, []);


    return (
        <>
           <HomePage/>
           <form onSubmit={handleSubmit} enctype="multipart/form-data">
          <div class="wrapper">
    <div class="left">
    <img className="rounded-circle mt-5" src={newUser.photo ? URL.createObjectURL(newUser.photo) : PF+userImage.image} width="100px" height="200px" />
        <h4>{userName.username}</h4>
        <input type="file" id="photo" name="photo" accept="image/*"
                                    onChange={handlePhoto}
                                />
    </div>
    <div class="right">
        <div class="info">
            <h3>Profile</h3>
            <div class="info_data">
                 <div class="data">
                    <h4>Email</h4>
                    <p><b>{userEmail.email}</b></p>
                 </div>
            </div>
        </div>
      
      <div class="projects">
            <div class="projects_data">
                 <div class="data">
                    <h4>Name</h4>
                    <p><b>{userName.username}</b></p>
                 </div>
            </div>

            <div class="projects_data">
                 <div class="data">
                    <h4>Phone No</h4>
                    <p><b>{userNumber.number}</b></p>
                 </div>
            </div>
        </div>
      
        <div class="social_media">
        <input type="submit" name="Save" value="Save"/>            
        &ensp;
      <Link to = "/password"><button type="submit" class="btn btn-success">Change Password</button></Link>  
      </div>
    </div>
</div>
</form>
        </>
    )
}

export default Profile;
