import React from 'react'
import './styles/users.scss'
import UserCard from './partials/UserCard'

const Users = () => {
    return (
        <div className='min-h-screen'>
        <section className='card-section'>
            <h4 className='card-section_heading font-semibold'>All contributer</h4>
            <div className='div-flex'>
                <UserCard/>
                <UserCard/>
                <UserCard/>
            </div>
        </section>
    </div>
    )
}

export default Users
