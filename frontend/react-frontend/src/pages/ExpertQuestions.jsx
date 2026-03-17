import { useEffect, useState } from "react";

function ExpertQuestions(){

const user = JSON.parse(localStorage.getItem("user"));

const [questions,setQuestions] = useState([]);

useEffect(()=>{

fetch("http://localhost:5000/api/users/expert-questions/"+user.id)
.then(res=>res.json())
.then(data=>setQuestions(data));

},[]);


async function sendAnswer(id){

const answer = document.getElementById("answer_"+id).value;

await fetch(
"http://localhost:5000/api/users/answer-question",
{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
question_id:id,
expert_id:user.id,
answer
})
}
);

alert("Answer submitted");

window.location.reload();

}

return(

<div style={styles.body}>

<h1>Farmer Questions</h1>

<table style={styles.table}>

<thead>
<tr>
<th>Farmer</th>
<th>Question</th>
<th>Answer</th>
<th>Action</th>
</tr>
</thead>

<tbody>

{questions.map(q=>(

<tr key={q.id}>

<td>{q.farmer_name}</td>

<td>{q.question}</td>

<td>
<textarea id={"answer_"+q.id}></textarea>
</td>

<td>
<button onClick={()=>sendAnswer(q.id)}>
Submit
</button>
</td>

</tr>

))}

</tbody>

</table>

</div>

);

}

const styles = {

body:{
padding:"40px",
color:"white"
},

table:{
width:"100%",
background:"white",
color:"black",
borderCollapse:"collapse"
}

};

export default ExpertQuestions;