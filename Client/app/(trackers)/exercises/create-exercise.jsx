import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Button, Alert } from 'react-native'
import {Picker} from '@react-native-picker/picker';
import { SelectList, MultipleSelectList } from 'react-native-dropdown-select-list'
import FormField from '../../../components/formfield.jsx'
import { IP_ADDRESS } from '@env';
import { router } from 'expo-router'
import { useGlobalContext } from '../../../context/GlobalProvider.js';
import icons from '../../../helper/icons.js'
import { useState } from 'react'

export default function CreateExercise() {
    const [properties, setProperties] = useState({isVisible: false})
    const [otherMuscles, setOtherMuscles] = useState([])
    const {exerciseRefresh, setExerciseRefresh} = useGlobalContext();

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

    // function to save the exercise to the database
    const createSubmit = async () => {
        const updatedProperties = {...properties, otherMuscles: otherMuscles}
        try{
            const res = await fetch(IP_ADDRESS + 'create_exercise',
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(updatedProperties)
                }
            )

            if(res.status !== 200){
                const errorMessage = await res.json()
                throw new Error(errorMessage.message);
            }
            setExerciseRefresh(!exerciseRefresh)
            router.back()
        }catch(e){
            Alert.alert('Error ',e.message)
        }
    }

    return (
        <SafeAreaView className="bg-primary">
            <ScrollView className="h-full p-6">
                <View className="items-center">
                    <Text className="text-white text-lg font-pregular">Create an exercise</Text>
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

                <Text className="text-base text-gray-100 font-pmedium text-sm mt-10">Public Visibility</Text>
                <Picker
                    selectedValue={properties.isVisible}
                    onValueChange={(itemValue, itemIndex) =>
                        setProperties({...properties, isVisible: itemValue})
                    }
                    itemStyle={{ color: 'white', fontSize: 20 }}
                    >
                    <Picker.Item label="Private" value={false} />
                    <Picker.Item label="Public" value={true} />
                </Picker>

                <View className="pb-20">
                    <TouchableOpacity className="bg-green-400 py-4 rounded-3xl items-center" onPress={createSubmit}>
                        <Text className="text-black font-pmedium">Create Exercise</Text>
                    </TouchableOpacity>
                </View>
                
            </ScrollView>
        </SafeAreaView>
    )
}