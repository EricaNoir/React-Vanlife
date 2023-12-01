import React from "react";
import {
    useLoaderData,
    redirect,
    Form,
    useActionData,
    useNavigation,
} from "react-router-dom";
import { loginUser } from "../../api";

export async function action({ request }) {
    const formData = await request.formData();
    const email = formData.get("email");
    const password = formData.get("password");
    const url = new URL(request.url).searchParams.get("redirectTo") || "/host";

    try {
        const data = await loginUser({ email, password });
        localStorage.setItem("loggedin", true);
        return redirect(url);
    } catch (e) {
        return e.message;
    }
}

export default function Login() {
    const message = useLoaderData();
    const errorMessage = useActionData();
    const navigation = useNavigation().state;
    console.log(navigation);

    return (
        <div className="login-container">
            <h1>Sign in to your account</h1>
            {errorMessage && <h2 className="red">{errorMessage}</h2>}
            {message && <h2 className="red">{message}</h2>}
            <Form className="login-form" method="post" replace>
                <input name="email" type="email" placeholder="Email address" />
                <input name="password" type="password" placeholder="Password" />
                <button
                    className="link-button"
                    disabled={navigation === "submitting"}
                >
                    {navigation === "submitting" ? "Logging in..." : "Log in"}
                </button>
            </Form>
        </div>
    );
}
