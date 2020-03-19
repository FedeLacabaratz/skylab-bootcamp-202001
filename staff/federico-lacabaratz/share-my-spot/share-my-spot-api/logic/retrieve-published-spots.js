const { models: { User, Spot } } = require('share-my-spot-data')
const { validate } = require('share-my-spot-utils')
const { NotFoundError } = require('share-my-spot-errors')

module.exports = id => {
    validate.string(id, 'id')

    return User.findById(id)
        .then(user => {
            if (!user) throw new NotFoundError(`user with id ${id} not found`)
            
            return Spot.find({ publisherId: id, created: { $lte: new Date } })
                .lean()
                .then(spots => {
                    spots.forEach(spot => {
                        spot.id = spot._id.toString()

                        delete spot._id

                        spot.publisherId = spot.publisherId.toString()
                    })

                    return spots
                })
        })
        
}