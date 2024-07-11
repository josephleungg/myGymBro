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
})

const Exercise = mongoose.model('Exercise', ExercisesSchema);

export default Exercise;