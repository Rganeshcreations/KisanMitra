import { useEffect, useState } from "react";

function FarmerAnswers(){

const user = JSON.parse(localStorage.getItem("user"));

const [questions,setQuestions] = useState([]);

useEffect(()=>{

fetch("http://localhost:5000/api/users/my-questions/"+user.id)
.then(res=>res.json())
.then(data=>setQuestions(data));

},[]);

return(

<div style={styles.body}>

<h1>📩 My Questions</h1>

<table style={styles.table}>

<thead>
<tr>
<th>Question</th>
<th>Status</th>
<th>Expert</th>
<th>Answer</th>
</tr>
</thead>

<tbody>

{questions.map(q=>(

<tr key={q.id}>

<td>{q.question}</td>

<td>{q.status}</td>

<td>{q.expert_name}</td>

<td>{q.answer || "Waiting for answer..."}</td>

</tr>

))}

</tbody>

</table>

</div>

);

}

const styles={

body:{
marginLeft:"260px",
padding:"40px",
color:"white"
},

table:{
width:"100%",
background:"rgba(255,255,255,0.9)",
color:"black",
borderCollapse:"collapse"
}

};

export default FarmerAnswers;