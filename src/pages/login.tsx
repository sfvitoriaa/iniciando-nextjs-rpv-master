import { useState } from "react";

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    async function submitLogin() {
        const response = await fetch ('http://localhost:3000/api/login', {
            method: 'POST',
            body: JSON.stringify({ username, password })
        })

        const data = await response.json()
        console.log('Data: ', data)
    } catch (error) {
        console.error(error)
        
    }
    return (
        <div className="w-full h-screen flex items-center justify-center">
            <div className=" min-w-70 border border-solid border-zinc-50 shadow-2xl rounded-lg p-8">
                <h1 className="text-4xl text-zinc-100 mb-10">Página de Login</h1>
                <div className="flex flex-col items-start justify-center">
                    <label>Username</label>
                    <input
                        type="text"
                        className="border border-solid border-zinc-700 p-2 text-lg text-zinc-200 rounded-md w-full"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="flex flex-col items-start justify-center mt-2">
                    <label>Password</label>
                    <input
                        type="password"
                        className="border border-solid border-zinc-700 p-2 text-lg text-zinc-200 rounded-md w-full"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button onClick={submitLogin} className="w-full border border-solid border-zinc-300 rounded-md mt-10 py-2 hover:border-zinc-200 hover:bg-sky-500 transition-all delay-100">Logar</button>
            </div>
        </div>
    )
}