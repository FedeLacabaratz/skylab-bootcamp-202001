const { Schema, Types: { ObjectId } } = require('mongoose')

module.exports = new Schema({
    created: { type: Date, default: Date.now },
    publisherId: { type: ObjectId, ref: 'User' },
    title: { type: String, required: true },
    addressLocation: { type: String, required: true },
    addressStNumber: {type: String, required: true },
    addressOther: {type: String, required: true },
    length: {type: Number, required: true },
    width: {type: Number, required: true },
    height: {type: Number, required: true },
    area: {type: Number, required: true},
    description: {type: String, required: true},
    price: {type: Number, required: true, lowercase: true},
    acceptsBarker: {type: Boolean, required: true, default: false},
    surveillance: {type: Boolean, required: true, default: false},
    isCovered: {type: Boolean, required: true, default: false},
    hourStarts: { type: String, required: true },
    hourEnds: { type: String, required: true },
    mon: {type: Boolean, required: true, default: false},
    tue: {type: Boolean, required: true, default: false},
    wed: {type: Boolean, required: true, default: false},
    thu: {type: Boolean, required: true, default: false},
    fri: {type: Boolean, required: true, default: false},
    sat: {type: Boolean, required: true, default: false},
    sun: {type: Boolean, required: true, default: false},
    status: {type: String, enum: ['available', 'unavailable'], default: 'available'},
    bookingCandidates: [{ type: ObjectId, ref: 'User' }],
    bookedTo: { type: ObjectId, ref: 'User' }
})
