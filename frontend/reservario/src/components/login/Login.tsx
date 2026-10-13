import React, { useState } from 'react'

const Login = () => {

    const [loginData, setLoginData] = useState({
        login: "",
        password: ""
    });

    const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Handle login logic here
        console.log("Login:", login);
        console.log("Password:", password);

        try {
            fetch("http://localhost:3000/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(loginData)
            })
            .then(response => response.json())
            .then(data => {
                console.log("Login successful:", data);
            });
        } catch (error) {
            console.error("Error during login:", error);
        }
    };

        
    return (
        <div className='w-full h-screen flex justify-center items-center'>
            <div className="flex flex-col w-full md:w-1/3 h-1/2 bg-white rounded-lg shadow-lg p-8">
                <h1 className="text-2xl font-bold mb-4">Login</h1>
                <form className="flex flex-col" onSubmit={handleLogin}>
                    <label htmlFor="login" className="mb-2">E-mail or username</label>
                    <input
                        id="login" 
                        type="text"
                        placeholder="Enter your e-mail or username"
                        value={loginData.login}
                        onChange={(e) => setLoginData(
                            {
                                ...loginData, 
                                login: e.target.value
                            }
                        )}
                        className="border border-gray-300 rounded-lg p-2 mb-4"
                    />
                    <label htmlFor="password" className="mb-2">Password</label>
                    <input
                        id="password"
                        type="password"
                        placeholder="Enter your password"
                        value={loginData.password}
                        onChange={(e) => setLoginData(
                            {
                                ...loginData, 
                                password: e.target.value
                            }
                        )}
                        className="border border-gray-300 rounded-lg p-2 mb-4"
                    />
                    <button
                        type="submit"
                        className="bg-blue-500 text-white rounded-lg p-2 hover:bg-blue-600 transition-colors"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Login
