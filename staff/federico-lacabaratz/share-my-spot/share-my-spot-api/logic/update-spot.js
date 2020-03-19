const { validate } = require('share-my-spot-utils')
const { models: { Spot } } = require('share-my-spot-data')

module.exports = (userId, body, spotId) => {
    validate.string(userId, 'userId')
    validate.string(spotId, 'spotId')

    return Spot.findOneAndUpdate({ _id: spotId, publisherId: userId }, { $set: body })
        .then(() => { })
}