import useAsyncEffect from "use-async-effect"
import axios from "axios";
import { useState } from "react";

export const Balance = ({ value = 0 }) => {
    const [balance, setBalance] = useState(value);
    useAsyncEffect(async() => {
        const url = "http://localhost:3000/api/v1/account/balance";
        const token = localStorage.getItem("token");
        const config = {
            "headers": {
                "Authorization": `Bearer ${token}`
            }
        }
        const response = await axios.get(url, config);
        setBalance(response?.data?.balance);
    }, [])
    return <div className="flex">
        <div className="font-bold text-lg">
            Your balance
        </div>
        <div className="font-semibold ml-4 text-lg">
            Rs {balance}
        </div>
    </div>
}