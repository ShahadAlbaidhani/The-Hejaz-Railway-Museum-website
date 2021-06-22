const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    Name:{
        type: String
    }, 
    Description: {
        type: String
    },
    Location:
    {
        type: String
    },
    contactInfo: {
         phone: { type: Number},
         email: {type : String}
    },
    tickets:[{
        type : mongoose.Schema.Types.ObjectId , 
        ref : 'TicketModel'
    }]
},
{
    timestamps: true // means createdAt and updatedAt
});

 
const User = mongoose.model("TicketModel", userSchema);

module.exports = User;