import mongoose from 'mongoose';
import User from '../models/users.model.js'

export default async function updateUsers() {
    const updateResult = await User.updateMany({}, {
        $set: {
            "properties.name": "",
            "properties.age": 0,
            "properties.bio": "",
            "properties.sex": "",
            "properties.weight": 0,
            "properties.height": 0,
            "properties.bodyFat": 0,
            "properties.daysAtGym": [],
            "properties.progressPics": [],
        }
    });
    console.log(updateResult); // This will log the result of the update operation
}