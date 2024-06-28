import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcrypt';

const UsersSchema = mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: [true, 'Please enter a username'],
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Please enter an email'],
        validate: [validator.isEmail,'Please enter a valid email']
    },
    password: {
        type: String,
        required: [true, 'Please enter a password'],
        minLength: [6, 'Minimum password length is 6 characters']
    },
    properties: {
        name: { type: String, default: '' },
        age: { type: Number, default: 0 },
        bio: { type: String, default: '', maxlength: 256},
        sex: { type: String, default: '' },
        weight: { type: Number, default: 0 },
        height: { type: Number, default: 0 },
        bodyFat: { type: Number, default: 0 },
        daysAtGym: { type: Array, default: [] },
        progressPics: { type: Array, default: [] },
    },
    dateCreated: {
        type: Date,
        default: Date.now
    }
});

UsersSchema.post('save', function (doc, next){
    console.log('New user was created and saved', doc);
    next();
});

UsersSchema.pre('save', async function (next){
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

const User = mongoose.model('User', UsersSchema);

export default User;