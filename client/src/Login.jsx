import { useState } from 'react'
import { Link } from 'react-router-dom'
import './styles/sign-page.css'
const Login = () => {
    const [data, setData] = useState({ email: "", password_str: "" })
    function writeInput(e) {
        const { name, value } = e.target
        console.log(name, value)
        setData({ ...data, [name]: value })
    }

    async function submit(e) {
        e.preventDefault()
        const res = await fetch('/api/login', { method: "post", body: JSON.stringify(data), headers: { "content-type": "application/json" } })
        console.log(res.json())
    }
    return (

        <div>
            <h4 className='responseMessege'>''</h4>
            <form onSubmit={(e) => submit(e)} autoComplete='off'>
                <h4>Login here !</h4>
                <input type="email" placeholder="Email" required name="email" onInput={(e) => writeInput(e)} value={data.email} /><br />
                <input type="password" placeholder="Password" required name="password_str" onInput={(e) => writeInput(e)} value={data.password} /><br />
                <button className="button" type="submit" > Login</button>
                <Link className="link" to="/resetpassword">Forget the password</Link>
                <Link className="link" to="/signup"> Dont have an account , create one !</Link>
            </form>
        </div>

    )
}

export default Login
