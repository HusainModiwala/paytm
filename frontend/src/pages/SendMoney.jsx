import axios from "axios";
import { useState } from "react";
import { useSearchParams } from "react-router-dom"
import { useNavigate } from "react-router-dom";
import useAsyncEffect from "use-async-effect";
export const SendMoney = () => {
    const [searchParams] = useSearchParams();
    const [amount, setAmount] = useState(0);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useAsyncEffect(async() => {
        const url = "http://localhost:3000/api/v1/user/me";
            const token = localStorage.getItem("token");
            const config = {
                "headers": {
                    "Authorization": `Bearer ${token}`
                }
            }
            try {
              const response = await axios.get(url, config);
              if(response.data !== 'Authenticated') {
                navigate('/signin');
                return;
              }
              setLoading(false);
            } catch (error) {
              navigate('/signin');
            }
      }, [])
    async function handleOnClick() {
        const id = searchParams.get("id");
        const url = "http://localhost:3000/api/v1/account/transfer";
        const token = localStorage.getItem("token");
        const config = {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          };
        const response = await axios.post(url, {to: id, amount}, config);
        console.log(response.data);
    }
    return (loading?<div>Loading...</div> : <div className="flex justify-center h-screen bg-gray-100">
        <div className="h-full flex flex-col justify-center">
            <div
                className="border h-min text-card-foreground max-w-md p-4 space-y-8 w-96 bg-white shadow-lg rounded-lg"
            >
                <div className="flex flex-col space-y-1.5 p-6">
                <h2 className="text-3xl font-bold text-center">Send Money</h2>
                </div>
                <div className="p-6">
                <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                    <span className="text-2xl text-white">A</span>
                    </div>
                    <h3 className="text-2xl font-semibold">{searchParams.get("name")}</h3>
                </div>
                <div className="space-y-4">
                    <div className="space-y-2">
                    <label
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        htmlFor="amount"
                    >
                        Amount (in Rs)
                    </label>
                    <input
                        type="number"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        id="amount"
                        placeholder="Enter amount"
                        onChange={e => setAmount(e.target.value)}
                    />
                    </div>
                    <button className="justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2 w-full bg-green-500 text-white"
                        onClick={handleOnClick}
                    >
                        Initiate Transfer
                    </button>
                </div>
                </div>
        </div>
      </div>
    </div>)
}