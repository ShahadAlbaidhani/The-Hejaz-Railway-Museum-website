const { text } = require('express');
const mongoose = require('mongoose');

const cardSchema = mongoose.Schema({
    ownerName:
    {
        type: String, required: true,
        minLength: [3, "Last name must be more then 3 characters"],
        maxLength: [99, "Name is too long"]
    },
    cvv: {
        type: Number, required: true, maxLength: [3], minLength: [3]
    },
    cardNumber: {
        type: String, required: true, maxLength: [16], minLength: [16]
    },
    expiryDate: {
        type: String, required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserModel'
    }
},
    {
        timestamps: true // means createdAt and updatedAt
    });

cardSchema.methods.lastFourDigitsOfCardNumber = function () {
    return this.cardNumber.substr(11, 4);
}
const Card = mongoose.model("CardModel", cardSchema);

module.exports = Card;