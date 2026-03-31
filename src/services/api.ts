const API = "http://localhost:5000/api"

export const loginUser = async (email: string, password: string) => {

    const res = await fetch(`${API}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
    })

    return res.json()

}

export const signupUser = async (name: string, email: string, password: string) => {

    const res = await fetch(`${API}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password })
    })

    return res.json()

}