const { models: { Spot } } = require('share-my-spot-data')

module.exports = (filter = {}) => {
    const { location, length, height, width, price, acceptBarker } = filter
    const _filter = {  status: 'available' }

    if (typeof location !== 'undefined') {
        validate.string(location, 'location')
        _filter.addressLocation = { $regex: location }
    }
    
    if (typeof length !== 'undefined') {
        validate.number(length, 'length')
        _filter.length = { $gte: length }
    }
    
    if (typeof height !== 'undefined') {
        validate.number(height, 'height')
        _filter.height = { $gte: height }
    }
    
    if (typeof width !== 'undefined') {
        validate.number(width, 'width')
        _filter.width = { $gte: width }
    }

    if (typeof price !== 'undefined') {
        validate.number(price, 'price')
        _filter.price = { $lte: price }
    }

    if (typeof acceptBarker !== 'undefined') {
        validate.type(acceptBarker, 'acceptBarker', Boolean)
        _filter.acceptBarker = acceptBarker
    }

    return Spot.find(_filter).sort({ created: -1 })
        .then(spots => {
            return spots
        })
}