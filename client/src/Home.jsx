import React from 'react'
import './styles/home.scss'
import Card from './partials/Card'
const Home = () => {
    const cards = [
        {
            name: 'Pimpalgaon reserviour wadad',
            author: "Sanket Gawande",
            postedon: new Date().toDateString(),
            thumbnail: '/img/dam.jpg',


        },
        {
            name: 'Bhamda gadh mahadev mandir , Wadad',
            author: "PragatiGawande",
            postedon: new Date().toDateString(),
            thumbnail: '/img/mahadeva.jpg',


        },
        {
            name: 'Bhamda gadh mahadev mandir , Wadad',
            author: "PragatiGawande",
            postedon: new Date().toDateString(),
            thumbnail: '/img/mahadeva.jpg',


        },
        {
            name: 'Bhamda gadh mahadev mandir , Wadad',
            author: "PragatiGawande",
            postedon: new Date().toDateString(),
            thumbnail: '/img/mahadeva.jpg',


        },
        {
            name: 'Pimpalgaon reserviour wadad',
            author: "Sanket Gawande",
            postedon: new Date().toDateString(),
            thumbnail: '/img/dam.jpg',


        }
    ]
    return (
        <div className='w-screen'>
            <main>
                <div className='hero-content' id='places'>
                    <h2>Welcome to <span>Spots</span> </h2>
                    <p> Get and share beautiful locations with us </p>
                    <h5>Join us and start contributing </h5>
                    <a href='#places'> Go to places</a>
                </div>
            </main>
            <section className='card-section md:p-5'>
                <h4 className='card-section_heading'>Most seen places</h4>
                <div className='flex flex-wrap  px-6 md:px-12'>

                    {
                        cards.map(data => {
                            const id = Math.random().toString(36).substring(2, 10)
                            data.id = id;
                            return <Card data={data} key={data.id} />
                        })
                    }
                </div>
            </section>
        </div>
    )
}

export default Home
