const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    user:{
        type : mongoose.Schema.Types.ObjectId , 
        ref : 'UserModel'
    },
    tickets:[{
        type : mongoose.Schema.Types.ObjectId , 
        ref : 'TicketModel'
    }],
    card:{
        type : mongoose.Schema.Types.ObjectId, 
        ref : 'CardModel'
    }
},
{
    timestamps: true // means createdAt and updatedAt
});

 
const User = mongoose.model("OrderModel", userSchema);

module.exports = User;