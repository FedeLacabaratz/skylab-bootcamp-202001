require('dotenv').config()
const { validate } = require('share-my-spot-utils')
const { NotFoundError } = require('share-my-spot-errors')
const { ObjectId, models: { Spot } } = require('share-my-spot-data')
const fs = require('fs')
const path = require('path')

/**
* 
* 
* @param {ObjectId} spotId id of the spot
* @returns {Promise} - data of image  
*/

module.exports = function (spotId) {
    validate.string(spotId, 'spotId')
    
    return (async () => {
        const spot = Spot.findById(spotId)        
        if (!spot) throw new NotFoundError(`spot with id ${spotId} not found`)

        let goTo = path.join(__dirname, `../data/spots/${spotId}/garage01.jpg`)
                try {
            if (fs.existsSync(goTo)) {
                return fs.createReadStream(goTo)
            } else {
                const defaultImage = path.join(__dirname, `../data/defaultimage/avatar00.jpg`)
                return fs.createReadStream(defaultImage)
            }
        } catch (error) {
        }

    })()
}