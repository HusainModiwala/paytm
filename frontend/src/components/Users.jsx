import { useState } from "react"
import { useAsyncEffect } from 'use-async-effect';
import { Button } from "./Button"
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const Users = () => {
    // Replace with backend call
    const [users, setUsers] = useState([]);
    const [query, setQuery] = useState("");

    useAsyncEffect(async () => {
        const url = `http://localhost:3000/api/v1/user/bulk?filter=${query}`;
        const response = await axios.get(url);
        setUsers(response?.data);
    }, [query]);

    return <>
        <div className="font-bold mt-6 text-lg">
            Users
        </div>
        <div className="my-2">
            <input onChange={(e) => setQuery(e.target.value)} type="text" placeholder="Search users..." className="w-full px-2 py-1 border rounded border-slate-200"></input>
        </div>
        <div>
            {users.map(user => <User user={user} key={user._id}/>)}
        </div>
    </>
}

function User({user}) {
    const navigate = useNavigate();

    return <div className="flex justify-between">
        <div className="flex">
            <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                <div className="flex flex-col justify-center h-full text-xl">
                    {user.firstName[0]}
                </div>
            </div>
            <div className="flex flex-col justify-center h-ful">
                <div>
                    {user.firstName} {user.lastName}
                </div>
            </div>
        </div>

        <div className="flex flex-col justify-center h-ful">
            <Button label={"Send Money"} onClick={() => navigate(`/send?id=${user._id}&name=${user.firstName}`)}/>
        </div>
    </div>
}