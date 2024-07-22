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
        {key: '1', value:'Chest'},
        {key: '2', value:'Lower Back'},
        {key: '3', value:'Middle Back'},
        {key: '4', value:'Upper Back'},
        {key: '5', value:'Triceps'},
        {key: '6', value:'Forearms'},
        {key: '7', value:'Biceps'},
        {key: '8', value:'Hamstrings'},
        {key: '9', value:'Calves'},
        {key: '10', value:'Quadriceps'},
        {key: '11', value:'Obliques'},
        {key: '12', value:'Glutes'},
        {key: '13', value:'Hip Flexors'},
        {key: '14', value:'Traps'},
        {key: '15', value:'Lats'},
        {key: '16', value:'Abs'},
        {key: '17', value:'Shoulders'},
        {key: '18', value:'Front Delt'},
        {key: '19', value:'Rear Delt'},
        {key: '20', value:'Neck'},
        {key: '21', value:'Other'},
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