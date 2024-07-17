import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Button, Alert } from 'react-native'
import { SelectList, MultipleSelectList } from 'react-native-dropdown-select-list'
import FormField from '../../../components/formfield.jsx'
import icons from '../../../helper/icons.js'
import { useState } from 'react'

export default function CreateExercise() {
    const [properties, setProperties] = useState({})
    const [otherMuscles, setOtherMuscles] = useState([])

    const equipmentData = [
        {key: '1', value:'none'},
        {key: '2', value:'dumbbell'},
        {key: '3', value:'barbell'},
        {key: '4', value:'machine'},
        {key: '5', value:'plate'},
        {key: '6', value:'other'},
    ]

    const muscleGroups = [
        {key: '1', value:'chest'},
        {key: '2', value:'lower back'},
        {key: '3', value:'middle back'},
        {key: '4', value:'upper back'},
        {key: '5', value:'triceps'},
        {key: '6', value:'forearms'},
        {key: '7', value:'biceps'},
        {key: '8', value:'hamstrings'},
        {key: '9', value:'calves'},
        {key: '10', value:'quadriceps'},
        {key: '11', value:'obliques'},
        {key: '12', value:'glutes'},
        {key: '13', value:'hip flexors'},
        {key: '14', value:'traps'},
        {key: '15', value:'lats'},
        {key: '16', value:'abs'},
        {key: '17', value:'shoulders'},
        {key: '18', value:'front delt'},
        {key: '19', value:'rear delt'},
        {key: '20', value:'neck'},
        {key: '21', value:'other'},
    ]

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

                <Text className="text-base text-gray-100 font-pmedium text-sm mb-2 mt-7">Primary Muscle</Text>
                <SelectList 
                    className="text-white"
                    setSelected={(val) => setProperties({...properties, primaryMuscle: val})} 
                    data={muscleGroups} 
                    save="value"
                    search={false}
                    placeholder="Select Primary Muscle"
                    boxStyles={{backgroundColor: "#1E1E2D", borderColor: "#2e2e48", height: 65, alignItems: "center", borderRadius: 16}}
                    inputStyles={{color: "white", fontSize: 16, fontFamily: "Poppins-Semibold"}}
                    dropdownStyles={{backgroundColor: "#1E1E2D", borderColor: "#2e2e48"}}
                    dropdownTextStyles={{color: "white", marginBottom: 10, fontSize: 16, fontFamily: "Poppins-Regular"}}
                />

                <Text className="text-base text-gray-100 font-pmedium text-sm mb-2 mt-7">Other Muscles</Text>
                <MultipleSelectList 
                    className="text-white"
                    setSelected={(val) => setOtherMuscles(val)}
                    data={muscleGroups} 
                    save="value"
                    search={false}
                    placeholder="Select Other Muscles"
                    boxStyles={{backgroundColor: "#1E1E2D", borderColor: "#2e2e48", height: 65, alignItems: "center", borderRadius: 16}}
                    inputStyles={{color: "white", fontSize: 16, fontFamily: "Poppins-Semibold"}}
                    dropdownStyles={{backgroundColor: "#1E1E2D", borderColor: "#2e2e48"}}
                    dropdownTextStyles={{color: "white", marginBottom: 10, fontSize: 16, fontFamily: "Poppins-Regular"}}
                />

                <Text className="text-base text-gray-100 font-pmedium text-sm mb-2 mt-7">Equipment</Text>
                <SelectList 
                    className="text-white"
                    setSelected={(val) => setProperties({...properties, equipment: val})} 
                    data={equipmentData} 
                    save="value"
                    search={false}
                    placeholder="Select Equipment"
                    boxStyles={{backgroundColor: "#1E1E2D", borderColor: "#2e2e48", height: 65, alignItems: "center", borderRadius: 16}}
                    inputStyles={{color: "white", fontSize: 16, fontFamily: "Poppins-Semibold"}}
                    dropdownStyles={{backgroundColor: "#1E1E2D", borderColor: "#2e2e48"}}
                    dropdownTextStyles={{color: "white", marginBottom: 10, fontSize: 16, fontFamily: "Poppins-Regular"}}
                />

                <Button 
                title="test properties"
                onPress={() => console.log(properties)}
                />

                <Button 
                className="mb-10"
                title="test other muscles"
                onPress={() => console.log(otherMuscles)}
                />

            </ScrollView>
        </SafeAreaView>
    )
}