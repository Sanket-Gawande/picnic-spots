import { useState } from 'react'

const Password = () => {
    const [data, setdata] = useState({})

    function writeInput(e) {
        setdata({ ...data, [e.target.name]: e.target.value })
    }
    function submit(e) {
        e.preventDefault()
    }
    return (
        <div className='center-div'>
            <form onSubmit={e => submit(e)}>
                <h4>Create an account</h4>
                <div>

                    <input required type="password" placeholder="Old password" name="oldpassword" onInput={(e) => writeInput(e)} value={data.password} /><br />
                    <input required type="password" placeholder=" New Password" name="newpassword" onInput={(e) => writeInput(e)} value={data.password} /><br />
                    <input required type="password" placeholder="Confirm Password" name="c_password" onInput={(e) => writeInput(e)} value={data.c_password} /><br />
                    <button class="button">Change password</button>
                </div>

            </form>
        </div>
    )
}

export default Password
