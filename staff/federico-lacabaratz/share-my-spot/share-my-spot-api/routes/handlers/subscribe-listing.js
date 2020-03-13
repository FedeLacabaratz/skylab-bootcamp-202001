const { subscribeListing } = require('../../logic')
const {  NotAllowedError } = require('share-my-spot-errors')

module.exports = (req, res) => {
    const { payload: { sub: userId }, body: {listingId} } = req

    try {
        subscribeListing(userId, listingId)
            .then(() =>
                res.status(200).json({message: "You're now subscribed to this listing(unless you're already subscribed?)"})
            )
            .catch(({ message }) =>
                res
                    .status(401)
                    .json({
                        error: message
                    })
            )
    } catch (error) {
        let status = 400

        switch (true) {
            case error instanceof NotAllowedError:
                status = 404 // not found
                break
        }

        const {message} = error

        res
            .status(status)
            .json({ 
                error: message
            })
    }
}