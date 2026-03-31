import React, { useState } from "react"

const Signup: React.FC = () => {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSignup = (e: React.FormEvent) => {
        e.preventDefault()
        alert("Signup clicked")
    }

    return (

        <div className="flex justify-center items-center min-h-screen bg-gray-100">

            <form
                onSubmit={handleSignup}
                className="bg-white p-6 rounded shadow-md w-80"
            >

                <h2 className="text-2xl font-bold mb-4">Signup</h2>

                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border p-2 w-full mb-3"
                />

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border p-2 w-full mb-3"
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border p-2 w-full mb-3"
                />

                <button
                    type="submit"
                    className="bg-green-500 text-white p-2 w-full"
                >
                    Signup
                </button>

            </form>

        </div>
    )
}

export default Signup