const { validate } = require('share-my-spot-utils')
const { models: { Spot, User } } = require('share-my-spot-data')
const { NotAllowedError } = require('share-my-spot-errors')

module.exports = (userId, spotId) => {
    validate.string(userId, 'userId')
    validate.string(spotId, 'spotId')

    return User.findOne({ _id: userId, publishedSpots: spotId })
    .then(correct => {
            if (correct) {
                return User.find({ publishedSpots: spotId })
            }
            else {
                throw new NotAllowedError('This user cannot delete this spot')
            }
        })
        .then(usersArray => {
            return usersArray.forEach(async user => await User.findByIdAndUpdate(user.id, { $pull: { publishedSpots: spotId } }))
        })
        .then(() => Spot.findByIdAndRemove(spotId))
        .then(() => { })
}