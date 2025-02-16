import { Heading } from "../components/Heading";
import { SubHeading } from "../components/SubHeading";
import { InputBox } from "../components/Input";
import { Button } from "../components/Button";
import { BottomWarning } from "../components/BottomWarning";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


export const SignIn = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleOnClick = async () => {
      const url = "http://localhost:3000/api/v1/user/signin";
        const data = {
            username,
            password
        }
      const response = await axios.post(url, data);
      console.log(response);
      localStorage.setItem("token", response?.data?.token);
      navigate('/dashboard');
    }

    return <div className="bg-slate-300 h-screen flex justify-center">
    <div className="flex flex-col justify-center">
      <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
        <Heading label={"Sign in"} />
        <SubHeading label={"Enter your credentials to access your account"} />
        <InputBox placeholder="harkirat@gmail.com" label={"Email"} onChange={e => setUsername(e.target.value)} />
        <InputBox placeholder="123456" label={"Password"} onChange={e => setPassword(e.target.value)} />
        <div className="pt-4">
          <Button label={"Sign in"} onClick={handleOnClick}/>
        </div>
        <BottomWarning label={"Don't have an account?"} buttonText={"Sign up"} to={"/signup"} />
      </div>
    </div>
  </div>
}