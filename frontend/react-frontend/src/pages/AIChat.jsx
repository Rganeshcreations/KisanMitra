import { useState } from "react";

function AIChat(){

const [message,setMessage] = useState("");
const [chat,setChat] = useState([]);

async function sendMessage(){

const res = await fetch(
"http://localhost:5000/api/users/ai-chat",
{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({message})
}
);

const data = await res.json();

setChat([...chat,
{user:message},
{ai:data.reply}
]);

setMessage("");

}

return(

<div style={styles.body}>

<h1>🤖 AI Farming Assistant</h1>

<div style={styles.chatBox}>

{chat.map((c,i)=>(

<div key={i}>

{c.user && <p><b>You:</b> {c.user}</p>}

{c.ai && <p><b>AI:</b> {c.ai}</p>}

</div>

))}

</div>

<div style={styles.inputArea}>

<input
value={message}
onChange={(e)=>setMessage(e.target.value)}
placeholder="Ask about crops, pests..."
/>

<button onClick={sendMessage}>
Send
</button>

</div>

</div>

);

}

const styles = {

body:{
padding:"40px",
color:"white"
},

chatBox:{
height:"350px",
overflowY:"auto",
background:"rgba(255,255,255,0.2)",
padding:"20px",
borderRadius:"10px",
marginBottom:"20px"
},

inputArea:{
display:"flex",
gap:"10px"
}

};

export default AIChat;