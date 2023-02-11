import React from 'react'
import {Link} from 'react-router-dom'
 const UserCard = () => {
    return (
        <div className='user-card_container'>
           <img src="" alt=""  className='user-card_img'/>
           <h4 className="user-card_name">Sanket Gawande</h4>
           <p className="user-contact">
               <a> 8698776145 |</a>
               <Link to="mailto:sanket@gmail.com"> sanket@gmail.com </Link>
           </p>
           <button>
                <Link to="/places/900"> View all places</Link> 
           </button>
        </div>
    )
}

export default UserCard
