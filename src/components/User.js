import {useState} from "react";

const User = ({name})=>{
    const [count] = useState(0);
    return (
    <div className="user-card m-4 p-4 bg-gray-50 rounded-lg">
        <h1>Count: {count}</h1>
        <h2>Name: {name}</h2>
        <h3>Location:Gorakhpur</h3>
        <h4>Contact: @priyamjaiswal</h4>
    </div>
    );
};

export default User;
