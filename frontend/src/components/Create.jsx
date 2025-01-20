//import React from 'react'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Create = () => {

    const [name, setName]=useState("");
    const [email, setEmail] = useState("");
    const [age, setAge] = useState(0);

    const navigate=useNavigate();

    //console.log(name,email,age)


    const handleSubmit= async (e) => {
        e.preventDefault();

        const addUser={name,email,age};
        try{
        const response=await fetch("http://localhost:8000",{
            method:'POST',
            body: JSON.stringify(addUser),
            headers:{
                "Content-Type":"application/json",
            },
        });

        const text=await response.text();

        if(!response.ok){
            console.log(`HTTP error! Status: ${response.status}`);
            console.log("Response text",text);
            throw new Error('Network response was not ok');
        }

        const result=JSON.parse(text);
        console.log(result);

        navigate("/all");
    }catch(error){
        console.log("Error:",error.message);

    }
    };

return (
    <div className='container my-2'>
        <h2 className='text-center'>Enter the data</h2>

<form onSubmit={handleSubmit} >
    <div className="mb-3">
        <label className="form-label">Name</label>
        <input type="text" className="form-control" value={name} onChange={(e)=>setName(e.target.value)}/>
    </div>

    <div className="mb-3">
        <label className="form-label">Email address</label>
        <input type="email" className="form-control" value={email} onChange={(e)=>setEmail(e.target.value)}/>
    </div>

    <div className="mb-3">
        <label className="form-label">Age</label>
        <input type="Number" className="form-control" value={age} onChange={(e)=>setAge(e.target.value)}/>
    </div>
            <button type="submit" className="btn btn-primary">Submit</button>
</form>

    </div>
  )
}

export default Create