import { useState, useEffect } from "react";

function Crop(){

const user = JSON.parse(localStorage.getItem("user"));

const [crop,setCrop] = useState("");
const [date,setDate] = useState("");
const [land,setLand] = useState("");
const [crops,setCrops] = useState([]);

useEffect(()=>{
loadCrops();
},[]);


async function loadCrops(){

const res = await fetch(
"http://localhost:5000/api/users/get-crops/"+user.id
);

const data = await res.json();

setCrops(data);

}


async function addCrop(){

if(!crop || !date || !land){
alert("Fill all fields");
return;
}

await fetch(
"http://localhost:5000/api/users/add-crop",
{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
user_id:user.id,
crop_name:crop,
seeding_date:date,
land_size:land
})
}
);

setCrop("");
setDate("");
setLand("");

loadCrops();

}


function daysSince(date){

const seedDate = new Date(date);
const today = new Date();

const diff = today - seedDate;

return Math.floor(diff/(1000*60*60*24));

}


return(

<div style={styles.body}>

<h1>🌱 Crop Management</h1>

<div style={styles.form}>

<input
placeholder="Crop Name"
value={crop}
onChange={(e)=>setCrop(e.target.value)}
/>

<input
type="date"
value={date}
onChange={(e)=>setDate(e.target.value)}
/>

<input
placeholder="Land Size (acres)"
value={land}
onChange={(e)=>setLand(e.target.value)}
/>

<button onClick={addCrop}>
Add Crop
</button>

</div>


<div style={styles.list}>

{crops.map(c=>(

<div key={c.id} style={styles.card}>

<h3>{c.crop_name}</h3>

<p>🌱 Seeded: {c.seeding_date}</p>

<p>📅 Days Since Seeding: {daysSince(c.seeding_date)} days</p>

<p>🌾 Land Size: {c.land_size} acres</p>

</div>

))}

</div>

</div>

);

}


const styles = {

body:{
marginLeft:"260px",
padding:"40px",
color:"white"
},

form:{
display:"flex",
gap:"10px",
marginBottom:"30px"
},

list:{
display:"grid",
gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",
gap:"20px"
},

card:{
background:"rgba(255,255,255,0.15)",
padding:"20px",
borderRadius:"12px",
backdropFilter:"blur(10px)"
}

};

export default Crop;