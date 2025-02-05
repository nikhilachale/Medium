import { SignupInput } from "@nikhilachale/medium-blog"
import axios from "axios"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { BACKEND_URL } from "../config"

const Auth = ({ type }: { type: "signup" | "signin" }) => {
    const navigate = useNavigate();
    const [postInputs, setPostInputs] = useState<SignupInput>({
        name: "",
        email: "",
        password: "",
    });

    async function sendRequest() {
        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type}`, postInputs);
            const jwt = response.data;
            localStorage.setItem("token", jwt);
            navigate("/blogs");
        } catch (e) {
            console.error("Error:", e);
        }
    }

    return (
        <div className="h-screen flex flex-col justify-center items-center space-y-4">
            <div className="text-3xl font-extrabold">
                {type === "signup" ? "Create an Account" : "Sign In"}
            </div>
            <div className="font-light text-slate-400">
                {type === "signup" ? "Already have an account?" : "Don't have an account?"}
                <Link className="pl-1.5 underline" to={type === "signup" ? "/signin" : "/signup"}>
                    {type === "signup" ? "Login" : "Sign Up"}
                </Link>
            </div>

            {type === "signup" && (
                <LabelInput
                    label="Name"
                    inputType="text"
                    placeholder="nikhilachale"
                    onChange={(e) => setPostInputs(c => ({ ...c, name: e.target.value }))}
                />
            )}

            <LabelInput
                label="Email"
                inputType="text"
                placeholder="nikhilachale@gmail.com"
                onChange={(e) => setPostInputs(c => ({ ...c, email: e.target.value }))}
            />

            <LabelInput
                label="Password"
                inputType="Password"
                placeholder="Enter your password"
                onChange={(e) => setPostInputs(c => ({ ...c, password: e.target.value }))}
            />

            <button
                type="submit"
                onClick={sendRequest}
                className="text-white mt-4 bg-black font-medium rounded-lg text-sm w-full max-w-md px-5 py-2.5 text-center"
            >
                {type === "signup" ? "Sign Up" : "Sign In"}
            </button>
        </div>
    )
}

export default Auth;

interface LabelInputProps {
    label: string;
    placeholder: string;
    inputType: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const LabelInput = ({ label, placeholder,inputType, onChange }: LabelInputProps) => {
    return (
        <div className="w-full max-w-md">
            <label className="block mb-2 text-sm font-bold text-gray-900 pt-2">
                {label}
            </label>
            <input
                type={inputType}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                placeholder={placeholder}
                onChange={onChange}
                required
            />
        </div>
    )
}