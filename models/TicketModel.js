const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    ticketDate:
    {
        type:Date , 
    },
    duration: {
        type: Number
    },
    ticketType: {
        type: String
    },
    isAvailable: {
        type: Boolean, default: true 
    },
    museum:{
        type : mongoose.Schema.Types.ObjectId , 
        ref : 'MuseumModel'
    },
    order :{
        type : mongoose.Schema.Types.ObjectId , 
        ref : 'OrderModel'
    },
    price:{
        type: Number, 
        required: true
    }
},
{
    timestamps: true // means createdAt and updatedAt
});

 
const User = mongoose.model("TicketModel", userSchema);

module.exports = User;