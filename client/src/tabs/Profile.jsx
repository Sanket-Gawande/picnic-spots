import { useState } from 'react'

const Profile = () => {
    const [data, setdata] = useState({})

    function writeInput(e) {
        setdata({ ...data, [e.target.name]: e.target.value })
    }
    function submit(e) {
        e.preventDefault()
    }
    return (
        <div className='center-div overflow-auto'>

            <form onSubmit={e => submit(e)}>
                <h4>My profile</h4>
                <div>
                    <label htmlFor="photo">
                        <img src="" alt="" />
                    </label>
                    <input type="file" className='file-input' name="profile-photo" id="photo" />
                    <input required type="text" placeholder="Full name" name="name" onInput={(e) => writeInput(e)} value={data.name} /><br />
                    <input required type="text" placeholder="Phone" pattern='[0-9]{10}' name="phone" onInput={(e) => writeInput(e)} value={data.phone} /><br />
                    <input required type="text" placeholder="Bio.." name="bio" onInput={(e) => writeInput(e)} value={data.password} /><br />
                    <button class="button">Update changes</button>
                </div>
            </form>

        </div>
    )
}

export default Profile
