import mongoose from 'mongoose';

const UserExerciseSchema = mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    exerciseID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Exercise',
        required: true,
    },
    personalRecord: {
        type: Number,
        default: 0,
    },
    oneRepMax: {
        type: Number,
        default: 0,
    },
})

const UserExercise = mongoose.model('UserExercise', UserExerciseSchema);

export default UserExercise;