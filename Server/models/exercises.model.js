import mongoose from 'mongoose';

const ExercisesSchema = mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: [true, 'Please enter a name'],
    },
    creator: {
        type: String,
        default: 'Admin',
    },
    description: {
        type: String,
        default: 'None',
    },
    primaryMuscle: {
        type: String,
        default: 'None',
    },
    otherMuscles: {
        type: Array,
        default: [],
    },
    equipment: {
        type: String,
        default: 'None',
    },
})

const Exercise = mongoose.model('Exercise', ExercisesSchema);

export default Exercise;