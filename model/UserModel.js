var mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;

var DB_URL = "mongodb://localhost:27017/Users"

mongoose.connect(DB_URL, {useNewUrlParser:true});


var UserSchema = new mongoose.Schema({
    email: {
        type: String,
        match: [/\S+@\S+\.\S+/, 'is invalid'],
        index: true,
        required: true,
        unique: true
    },
    hash: {
        type: String,
        required: true
    },
    name: {
        type: String,
        minlength: [2, 'is too short (minimum is 2 characters)'],
        required: true
    }
    
});

UserSchema.methods.comparePassword = async function(password, hash) {
    return await bcrypt.compare(password, hash);
};

UserSchema.methods.createUser = async function(user) {
    const hash = await bcrypt.hash(user.password, saltRounds);
    return await mongoose.model('User').create({
        email: user.email,
        hash: hash,
        name: user.name
    });
};

UserSchema.methods.getUserByEmail = async function(email) {
    return await mongoose.model('User').findOne({
        email: email
    });
};

UserSchema.methods.getAllUsers = async function() {
    return await mongoose.model('User').find({});
};




module.exports = mongoose.model('User', UserSchema);