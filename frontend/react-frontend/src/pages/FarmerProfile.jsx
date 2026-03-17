import { useEffect, useState } from "react";

function FarmerProfile(){

const user = JSON.parse(localStorage.getItem("user"));

const [profile,setProfile] = useState(null);

useEffect(()=>{

loadProfile();

},[]);


async function loadProfile(){

const res = await fetch(
"http://localhost:5000/api/users/farmer-profile/"+user.id
);

const data = await res.json();

if(data.exists){
setProfile(data);
}

}


return(

<div style={styles.body}>

{profile && (

<div style={styles.container}>

{/* LEFT PANEL */}

<div style={styles.left}>

<img
src="/images/user.png"
style={styles.image}
/>

<h2>{user.name}</h2>

<p>{profile.location}</p>

</div>


{/* RIGHT PANEL */}

<div style={styles.right}>

<h1>🌾 Farmer Profile</h1>

<p><b>Crops:</b> {profile.crops}</p>

<p><b>Land Area:</b> {profile.land_area} acres</p>

<p><b>Soil Type:</b> {profile.soil_type}</p>

<p><b>Location:</b> {profile.location}</p>

<p><b>Irrigation:</b> {profile.irrigation_type}</p>

</div>

</div>

)}

</div>

);

}

const styles = {

body:{
marginLeft:"260px",
padding:"40px",
color:"white"
},

container:{
display:"flex",
gap:"40px"
},

left:{
width:"300px",
background:"rgba(0,0,0,0.5)",
padding:"20px",
borderRadius:"15px",
textAlign:"center"
},

image:{
width:"150px",
height:"150px",
borderRadius:"50%",
border:"4px solid white"
},

right:{
flex:1,
background:"rgba(255,255,255,0.15)",
padding:"30px",
borderRadius:"15px",
backdropFilter:"blur(10px)"
}

};

export default FarmerProfile;