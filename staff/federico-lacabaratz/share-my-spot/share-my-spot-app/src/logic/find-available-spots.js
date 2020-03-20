import React from 'react'
import './index.sass'
import AdsResults from '../AdsResults'
// import { Link } from 'react-router-dom'

export default function({ onSearch, onLogout, ads, adDetail, onProfile, onToCreateAd, onToPubliProfile, onToFavorites, onFav, onToChats, query }) {
    return  <><section className="search">
        <div className="search__header">
            <nav>
                <div id="menuToggle">
                    <input type="checkbox" />
                    <span></span>
                    <span></span>
                    <span></span>
                    <ul className="menu">
                        <li><a className="menu__item" onClick={event => {
                             event.preventDefault()

                              onProfile()
                        }}>My Profile</a></li>
                        <li><a className="menu__item" onClick={event => {
                             event.preventDefault()

                              onToPubliProfile()
                        }}>Public Profile</a></li>
                        <li><a className="menu__item" onClick={event => {
                             event.preventDefault()

                              onToCreateAd()
                        }}>Create Ad</a></li>
                        <li><a className="menu__item" onClick={event => {
                             event.preventDefault()

                              onToFavorites()
                        }}>Favorites</a></li>
                        <li><a className="menu__item" onClick={event => {
                             event.preventDefault()

                              onToChats()
                        }}>Chats</a></li>
                        <li><a className="menu__item" onClick={event => {
                             event.preventDefault()

                              onLogout()
                        }}>Logout</a></li>
                    </ul>
                </div>
            </nav>
            <form className="search__form" onSubmit={event => {
                event.preventDefault()

                    const query = event.target.query.value
                

                    onSearch(query)
                }}>
                <input className="search__criteria" type="text" name="query" placeholder="criteria" defaultValue={query}/>
                <button className="search__submit">🔍</button>
            </form>
            <img className="search__logo" src="./images/sklogo.png" alt=""/>
        </div>
        <div className="title__landing">
            <h2>Productos cerca de ti</h2>
        </div> 
    </section>
     <AdsResults ads={ads} adDetail={adDetail} onFav={onFav} /> </> 
}

// http://localhost:8089/api/find-available-spots

// const { models: { Spot } } = require('share-my-spot-data')

// module.exports = (filter = {}) => {
//     const { location, length, height, width, price, acceptBarker } = filter
//     const _filter = {  status: 'available' }

//     if (typeof location !== 'undefined') {
//         validate.string(location, 'location')
//         _filter.addressLocation = { $regex: location }
//     }
    
//     if (typeof length !== 'undefined') {
//         validate.number(length, 'length')
//         _filter.length = { $gte: length }
//     }
    
//     if (typeof height !== 'undefined') {
//         validate.number(height, 'height')
//         _filter.height = { $gte: height }
//     }
    
//     if (typeof width !== 'undefined') {
//         validate.number(width, 'width')
//         _filter.width = { $gte: width }
//     }

//     if (typeof price !== 'undefined') {
//         validate.number(price, 'price')
//         _filter.price = { $lte: price }
//     }

//     if (typeof acceptBarker !== 'undefined') {
//         validate.type(acceptBarker, 'acceptBarker', Boolean)
//         _filter.acceptBarker = acceptBarker
//     }

//     return Spot.find(_filter).sort({ created: -1 })
//         .then(spots => {
//             return spots
//         })
// }