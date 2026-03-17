import { useState } from "react";

function Schemes(){

const [scheme,setScheme] = useState("");

function publish(){

alert("Scheme published");

setScheme("");

}

return(

<div style={styles.body}>

<h1>📢 Publish Agriculture Scheme</h1>

<textarea
placeholder="Enter scheme details"
value={scheme}
onChange={(e)=>setScheme(e.target.value)}
/>

<button onClick={publish}>
Publish
</button>

</div>

);

}

const styles = {

body:{
padding:"40px",
color:"white"
}

};

export default Schemes;