import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; 

const Read = () => {
    const [data, setData] = useState([]);
    const [error, setError] = useState("");

    // Fetching data
    async function getData() {
        try {
            const response = await fetch("http://localhost:8000/api/users"); // Ensure the endpoint is correct

            if (!response.ok) {
                const text = await response.json();
                console.log(text.error);
                setError(text.error);
                return; // Exit the function to prevent further execution
            }

            const result = await response.json();
            console.log("result", result);
            setData(result);
            setError("");
        } catch (error) {
            console.log("Fetch error:", error.message);
            setError("Failed to connect to the server");
        }
    }

    const handleDelete = async (id)=>{
        const response=await fetch(`http://localhost:8000/${id}`,{method:"DELETE",

        });

        const result=await response.json();

        if(!response.ok){
            console.log(result.error);
            setError(result.error);
        }
        if(response.ok){
            console.log("deleted",response.ok);
            setError("Deleted Succesfully");

            setTimeout(()=>{
                setError("");
                getData();
            },2000);
        }
    }

    useEffect(() => {
        getData();
    }, []);

    return (
        <div className="container my-2">
            <h2>All Data</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <div className="row">
                {data.map(user => (
                    <div className="col-3" key={user._id}>
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">{user.name}</h5>
                                <h6 className="card-subtitle mb-2 text-body-secondary">{user.email}</h6>
                                <p className="text-muted">{user.age}</p>
                                <a href="#" className="card-link" onClick={()=>handleDelete(user._id)}>Delete</a>
                                <Link to={`/${user._id}`} className="card-link">Edit</Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Read;
