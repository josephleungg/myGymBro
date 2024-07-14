import mongoose from 'mongoose';

const MealsSchema = mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: [true, 'Please enter a name'],
    },
    description: {
        type: String,
        default: 'None',
    },
    calories: {
        type: Number,
        default: 0,
    },
    protein: {
        type: Number,
        default: 0,
    },
    carbs: {
        type: Number,
        default: 0,
    },
    fats: {
        type: Number,
        default: 0,
    },
})

const Meal = mongoose.model('Meal', MealsSchema);

export default Meal;