const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const salt = 10;
const beautifyUnique = require('mongoose-beautiful-unique-validation');
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minlength: [3, "First name must be more then 3 characters"],
        maxLength: [99, "Name is too long"]
    },
    lastName: {
        type: String,
        required: true,
        minlength: [3, "Last name must be more then 3 characters"],
        maxLength: [99, "Name is too long"]
    },
    emailAddress: {
        type: String,
        required: true,
        lowercase: true,
        unique: "The email has been used by other user. If you already have an account try to login."
    },
    username: {
        type: String,
        required: true,
        lowercase: true,
        unique: "The username has been taken."
    },
    phone: {
        type: Number,
        required: true,
        maxLength: [10]
    },
    password: {
        type: String,
        required: true,
        minlength: 3
    },
    order: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'OrderModel'
    }],
    card: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CardModel'
    }


});

// VerifyPassword
userSchema.methods.verifyPassword = function (password) {
    console.log(this.password);
    return bcrypt.compareSync(password, this.password);
}

userSchema.methods.changePassword = function (oldPassword, newPassword) {
    if (bcrypt.compareSync(oldPassword, this.password)) {
        this.password = bcrypt.hashSync(newPassword, salt);
        return 1;
    } else {
        return -1;
    }

}
userSchema.plugin(beautifyUnique);

const User = mongoose.model("UserModel", userSchema);

module.exports = User;