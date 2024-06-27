import mongoose from 'mongoose';
import User from '../models/users.model.js'

export default async function updateUsers() {
    const updateResult = await User.updateMany({}, {
        $set: {
            email: {
                type: String,
                unique: true,
                required: true
            },
        }
    });
    console.log(updateResult); // This will log the result of the update operation
}