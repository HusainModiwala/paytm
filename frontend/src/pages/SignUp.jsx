import { Heading } from "../components/Heading";
import { SubHeading } from "../components/SubHeading";
import { InputBox } from "../components/Input";
import { Button } from "../components/Button";
import { BottomWarning } from "../components/BottomWarning";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const SignUp = () => {
  const navigate = useNavigate();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleOnClick = async () => {
        const url = "http://localhost:3000/api/v1/user/signup";
        const data = {
            firstName,
            lastName,
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
        <Heading label={"Sign up"} />
        <SubHeading label={"Enter your infromation to create an account"} />
        <InputBox placeholder="John" label={"First Name"} onChange={e => setFirstName(e.target.value)}/>
        <InputBox placeholder="Doe" label={"Last Name"} onChange={e => setLastName(e.target.value)}/>
        <InputBox placeholder="husain@gmail.com" label={"Email"} onChange={e => setUsername(e.target.value)}/>
        <InputBox placeholder="123456" label={"Password"} onChange={e => setPassword(e.target.value)}/>
        <div className="pt-4">
          <Button label={"Sign up"} onClick={handleOnClick}/>
        </div>
        <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"} />
      </div>
    </div>
  </div>
}