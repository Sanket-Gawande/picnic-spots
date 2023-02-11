import { useState } from 'react'
import {Link ,  useNavigate } from "react-router-dom";

const Signup = () => {
    const history = useNavigate();
    const [data, setData] = useState({ email: "", name: "", phone: "", password: "", c_password: "" })
    function writeInput(e) {
        const { name, value } = e.target
        console.log(name, value)
        setData({ ...data, [name]: value })
    }

    async function submit(e) {
        e.preventDefault()
        const res = await fetch('/api/signup',
            {
                method: "post",
                body: JSON.stringify(data),
                headers: { "content-type": "application/json" }
            }
        )

        const { status, msg }  = await res.json()
        
        if (status === 'error') {
            const a = document.querySelector(".responseMessege")
            a.classList.add('visible-danger')
            a.innerHTML = msg
        }
        if(status === 'success'){
            history.push = '/'
        }
    }
    return (
        <div class="form">
            <h4 className='responseMessege'> </h4>
            <form onSubmit={e => submit(e)}>
                <h4>Create an account</h4>
                <div>
                    <input required type="text" placeholder="Full name" name="name" onInput={(e) => writeInput(e)} value={data.name} /><br />
                    <input required type="email" placeholder="Email" name="email" onInput={(e) => writeInput(e)} value={data.email} /><br />
                    <input required type="text" placeholder="Phone" pattern='[0-9]{10}' name="phone" onInput={(e) => writeInput(e)} value={data.phone} /><br />
                    <input required type="password" placeholder="Password" name="password" onInput={(e) => writeInput(e)} value={data.password} /><br />
                    <input required type="password" placeholder="Confirm Password" name="c_password" onInput={(e) => writeInput(e)} value={data.c_password} /><br />
                    <button class="button">Create account</button>
                </div>
                <Link to="/login" class="link"> Already has an account, login here</Link>
            </form>
        </div>
    )
}

export default Signup
