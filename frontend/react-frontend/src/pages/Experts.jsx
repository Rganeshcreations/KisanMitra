import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Experts(){

const [experts,setExperts] = useState([]);
const navigate = useNavigate();

useEffect(()=>{

fetch("http://localhost:5000/api/users/experts")
.then(res=>res.json())
.then(data=>setExperts(data));

},[]);


function askExpert(id){

localStorage.setItem("selectedExpert",id);

navigate("/ask-expert");

}


return(

<div style={styles.body}>

<h1>👨‍🌾 Agriculture Experts</h1>

<div style={styles.container}>

{experts.map(exp=>(

<div key={exp.id} style={styles.card}>

<img
src="/images/user.png"
style={styles.image}
/>

<h2>{exp.name}</h2>

<p>🌾 {exp.specialization}</p>

<p>🎓 {exp.qualification}</p>

<p>📅 {exp.experience} years experience</p>

<p>📍 {exp.location}</p>

<button
style={styles.button}
onClick={()=>askExpert(exp.id)}
>
Ask Question
</button>

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

container:{
display:"grid",
gridTemplateColumns:"repeat(auto-fit,minmax(250px,1fr))",
gap:"25px"
},

card:{
background:"rgba(255,255,255,0.15)",
padding:"25px",
borderRadius:"15px",
textAlign:"center",
backdropFilter:"blur(10px)"
},

image:{
width:"90px",
height:"90px",
borderRadius:"50%",
marginBottom:"10px"
},

button:{
marginTop:"10px",
padding:"10px 15px",
border:"none",
borderRadius:"6px",
background:"green",
color:"white",
cursor:"pointer"
}

};

export default Experts;