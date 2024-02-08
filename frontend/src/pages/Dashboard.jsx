import useAsyncEffect from "use-async-effect"
import { Appbar } from "../components/Appbar";
import { Balance } from "../components/Balance";
import { Users } from "../components/Users";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
export const Dashboard = () => {
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
          console.log(response.data);
          if(response.data !== 'Authenticated') {
            navigate('/signin');
            return;
          }
          setLoading(false);
        } catch (error) {
          navigate('/signin');
        }
  }, [])

  return(
    loading ? <div>Loading...</div> : (
      <div>
        <Appbar />
        <div className="m-8">
          <Balance />
          <Users />
        </div>
      </div>
    )
  )
};
