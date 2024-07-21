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
    pastSetWeight: {
        type: Array,
        default: [],
    },
    pastDates: {
        type: Array,
        default: [],
    },
    personalRecord: {
        type: Number,
        default: 0,
    },
    personalRecordDate: {
        type: Date,
        default: null,
    },
    oneRepMax: {
        type: Number,
        default: 0,
    },
    oneRepMaxDate: {
        type: Date,
        default: null,
    },
})

const UserExercise = mongoose.model('UserExercise', UserExerciseSchema);

export default UserExercise;