import React from "react";
import { useLoaderData } from "react-router-dom";
import { loginUser } from "../../api";

export default function Login() {
    const [status, setStatus] = React.useState("idle");
    const message = useLoaderData();
    const [loginFormData, setLoginFormData] = React.useState({
        email: "",
        password: "",
    });

    function handleSubmit(e) {
        e.preventDefault();
        loginUser(loginFormData)
            .then(setStatus("submitting"))
            .then((data) => console.log(data))
            .finally(setStatus("submitting"));
    }

    function handleChange(e) {
        const { name, value } = e.target;
        setLoginFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    return (
        <div className="login-container">
            <h1>Sign in to your account</h1>
            {message && <h2 className="red">{message}</h2>}
            <form onSubmit={handleSubmit} className="login-form">
                <input
                    name="email"
                    onChange={handleChange}
                    type="email"
                    placeholder="Email address"
                    value={loginFormData.email}
                />
                <input
                    name="password"
                    onChange={handleChange}
                    type="password"
                    placeholder="Password"
                    value={loginFormData.password}
                />
                <button>Log in</button>
            </form>
        </div>
    );
}
