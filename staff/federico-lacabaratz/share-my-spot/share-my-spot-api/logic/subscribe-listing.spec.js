require('dotenv').config()

const { env: { TEST_MONGODB_URL } } = process
const { mongoose, models: { User, listing } } = require('listings-data')
const { Types: { ObjectId } } = mongoose
const { expect } = require('chai')
const { random } = Math
const subscribelisting = require('./subscribe-listing')

describe('subscribelisting', () => {
    before(() =>
        mongoose.connect(TEST_MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(() => Promise.all([User.deleteMany(), listing.deleteMany()]))
    )

    let name, surname, email, password, title, description, date, location

    beforeEach(() => {
        name = `name-${random()}`
        surname = `surname-${random()}`
        email = `email-${random()}@mail.com`
        password = `password-${random()}`
        title = `title-${random()}`
        description = `description-${random()}`
        date = new Date
        location = `location-${random()}`
    })

    describe('when user already exists', () => {
        let _id, _listingId, publisher

        beforeEach(() =>
            Promise.all([
                User.create({ name, surname, email, password }),
                listing.create({ title, description, date, location, publisher: publisher = new ObjectId })
            ])
                .then(([{ id }, { id: listingId }]) => {
                    _id = id
                    _listingId = listingId
                })
        )

        it('should succeed on correct and valid and right data', () =>
            subscribelisting(_id, _listingId)
                .then(() =>
                    Promise.all([
                        User.findById(_id),
                        listing.findById(_listingId)
                    ])
                )
                .then(([user, listing]) => {
                    expect(user).to.exist
                    expect(user.subscribed).to.contain(listing._id)
                    expect(listing).to.exist
                    expect(listing.title).to.equal(title)
                    expect(listing.description).to.equal(description)
                    expect(listing.date).to.deep.equal(date)
                    expect(listing.location).to.equal(location)
                    expect(listing.publisher.toString()).to.equal(publisher.toString())
                    expect(listing.subscribed).to.contain(user._id)
                })
        )
    })

    // TODO more happies and unhappies

    after(() => Promise.all([User.deleteMany(), listing.deleteMany()]).then(() => mongoose.disconnect()))
})