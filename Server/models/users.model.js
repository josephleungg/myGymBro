import mongoose from 'mongoose';

const UsersSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
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

const User = mongoose.model('User', UsersSchema);

export default User;