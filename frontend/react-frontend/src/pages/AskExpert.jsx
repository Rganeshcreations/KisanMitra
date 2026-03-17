import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AskExpert(){

const [question,setQuestion] = useState("");

const navigate = useNavigate();

const user = JSON.parse(localStorage.getItem("user"));

const expertId = localStorage.getItem("selectedExpert");


async function submitQuestion(){

if(!question){
alert("Enter question");
return;
}

const res = await fetch(
"http://localhost:5000/api/users/ask-question",
{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
farmer_id:user.id,
expert_id:expertId,
question
})
}
);

const data = await res.json();

alert(data.message);

navigate("/");

}


return(

<div style={styles.body}>

<div style={styles.box}>

<h2>Ask Agriculture Expert</h2>

<textarea
placeholder="Enter your farming question..."
value={question}
onChange={(e)=>setQuestion(e.target.value)}
/>

<button onClick={submitQuestion}>
Submit Question
</button>

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

box:{
background:"rgba(255,255,255,0.15)",
padding:"30px",
borderRadius:"12px",
width:"400px"
}

};

export default AskExpert;