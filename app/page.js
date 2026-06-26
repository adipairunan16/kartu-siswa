"use client";

import {
useState
}
from "react";

export default function(){

const[
form,
setForm
]=
useState({

nis:"",

name:"",

kelas:""

});

async function save(){

await fetch(
"/api/students",
{

method:"POST",

headers:{
"Content-Type":
"application/json"
},

body:
JSON.stringify(
form
)

}

);

alert(
"Data tersimpan"
);

}

return(

<div
style={{
padding:20
}}
>

<h1>
Data Siswa
</h1>

<input

placeholder="NIS"

onChange={
e=>

setForm({

...form,

nis:
e.target.value

})

}

/>

<br/>
<br/>

<input

placeholder="Nama"

onChange={
e=>

setForm({

...form,

name:
e.target.value

})

}

/>

<br/>
<br/>

<input

placeholder="Kelas"

onChange={
e=>

setForm({

...form,

kelas:
e.target.value

})

}

/>

<br/>
<br/>

<button
onClick={
save
}
>

Simpan

</button>

</div>

);

}