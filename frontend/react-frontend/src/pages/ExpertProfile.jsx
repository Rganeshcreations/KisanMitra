import { useEffect, useState } from "react";

function ExpertProfile(){

const user = JSON.parse(localStorage.getItem("user"));

const [profile,setProfile] = useState({});

useEffect(()=>{

fetch("http://localhost:5000/api/users/expert-profile/"+user.id)
.then(res=>res.json())
.then(data=>setProfile(data));

},[]);

return(

<div style={styles.body}>

<h1>👨‍🌾 Expert Profile</h1>

<div style={styles.card}>

<p><b>Name:</b> {user.name}</p>

<p><b>Specialization:</b> {profile.specialization}</p>

<p><b>Experience:</b> {profile.experience}</p>

<p><b>Qualification:</b> {profile.qualification}</p>

<p><b>Location:</b> {profile.location}</p>

<p><b>Phone:</b> {profile.phone}</p>

</div>

</div>

);

}

const styles={

body:{
padding:"40px",
color:"white"
},

card:{
background:"rgba(255,255,255,0.15)",
padding:"30px",
borderRadius:"12px",
width:"400px"
}

};

export default ExpertProfile;