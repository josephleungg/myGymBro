import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Button, Alert } from 'react-native'
import FormField from '../../../components/formfield.jsx'
import icons from '../../../helper/icons.js'
import { useState } from 'react'

export default function CreateExercise() {
    const [properties, setProperties] = useState({})

    return (
        <SafeAreaView className="bg-primary">
            <ScrollView className="h-full p-6">
                <View className="items-center">
                    <Text className="text-white">Testing</Text>
                </View>

                <FormField 
                title="Exercise Name"
                placeholder={"Enter exercise name"}
                value={properties.name}
                handleChangeText={(e) => setProperties({...properties, name: e})}
                otherStyles="mt-7"
                />
                
                <FormField
                title="Description"
                placeholder={"Enter exercise description"}
                value={properties.description}
                handleChangeText={(e) => setProperties({...properties, description: e})}
                otherStyles="mt-7"
                />

                <Button 
                title="test properties"
                onPress={() => console.log(properties)}
                />

            </ScrollView>
        </SafeAreaView>
    )
}