import React, { useEffect } from 'react'
import { MySpotItem } from '../components'
import './MySpots.sass'

export default function ({allMySpots, updateMySpot, deleteMySpot, handleMySpots}) {

    useEffect(() => {
        handleMySpots()
    }, [])

    return <ul className="mySpots">
        {allMySpots.map(mySpotItem => <MySpotItem key={mySpotItem.id} mySpotItem={mySpotItem} onToUpdateMySpot={updateMySpot} onToDeleteMySpot={deleteMySpot} />)}
    </ul>
}